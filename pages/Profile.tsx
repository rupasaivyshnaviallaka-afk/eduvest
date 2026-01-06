
import React, { useState, useEffect } from 'react';
import { auth, db, storage } from '../firebase';
import { updateProfile, deleteUser } from 'firebase/auth';
import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { ref, listAll, deleteObject } from 'firebase/storage';
import { UserProfile } from '../types';

const Profile: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  
  const [name, setName] = useState('');
  const [photoURL, setPhotoURL] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const user = auth.currentUser;
      if (!user) return;

      try {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          const data = docSnap.data() as UserProfile;
          setProfile(data);
          setName(data.name);
          setPhotoURL(data.photoURL || '');
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
        setError("Failed to load profile data.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdateLoading(true);
    setError(null);
    setSuccess(null);

    const user = auth.currentUser;
    if (!user) return;

    try {
      // 1. Update Auth Profile
      await updateProfile(user, {
        displayName: name,
        photoURL: photoURL || null
      });

      // 2. Update Firestore Document
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        name,
        photoURL: photoURL || null
      });

      setProfile({ ...profile!, name, photoURL: photoURL || null });
      setSuccess("Terminal profile updated successfully.");
      setIsEditing(false);
    } catch (err: any) {
      setError(err.message || "Failed to update profile.");
    } finally {
      setUpdateLoading(false);
    }
  };

  /**
   * Recursive helper to delete storage contents of a folder
   */
  const deleteStorageFolder = async (path: string) => {
    const folderRef = ref(storage, path);
    try {
      const listResult = await listAll(folderRef);
      
      // Delete all files in the current folder
      const fileDeletions = listResult.items.map((itemRef) => deleteObject(itemRef));
      
      // Recursively handle subfolders
      const folderDeletions = listResult.prefixes.map((prefixRef) => 
        deleteStorageFolder(prefixRef.fullPath)
      );
      
      await Promise.all([...fileDeletions, ...folderDeletions]);
    } catch (err) {
      console.warn(`Could not purge storage path: ${path}. It may already be empty or restricted.`, err);
    }
  };

  const handleDeleteAccount = async () => {
    const confirmed = window.confirm("CRITICAL WARNING: This will permanently purge your terminal access, all files in your /user_uploads folder, and your identity records. This action cannot be undone. Proceed?");
    if (!confirmed) return;

    setDeleteLoading(true);
    setError(null);

    const user = auth.currentUser;
    if (!user) return;

    try {
      // 1. Delete all files in user's storage folder: /user_uploads/{uid}
      await deleteStorageFolder(`user_uploads/${user.uid}`);

      // 2. Delete Firestore Document from /users/{uid}
      await deleteDoc(doc(db, "users", user.uid));
      
      // 3. Delete Firebase Authentication account
      await deleteUser(user);
      
      // The session will automatically terminate and App.tsx will redirect to Auth
    } catch (err: any) {
      if (err.code === 'auth/requires-recent-login') {
        setError("Account deletion requires recent authentication. Please sign out and sign in again to proceed with the terminal purge.");
      } else {
        setError(err.message || "Failed to purge account data. Some records may still exist.");
      }
    } finally {
      setDeleteLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-20 animate-in fade-in slide-in-from-bottom-6 duration-700">
      <div className="mb-12">
        <span className="text-emerald-500 text-[10px] font-black tracking-[0.4em] uppercase mb-4 block">Identity Control</span>
        <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter uppercase">Operator Profile</h1>
      </div>

      <div className="grid lg:grid-cols-3 gap-12">
        {/* Left: Avatar Card */}
        <div className="lg:col-span-1">
          <div className="glass-card rounded-[3rem] p-10 border border-white/10 text-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-emerald-500/5 blur-[80px] -z-10 group-hover:bg-emerald-500/10 transition-all"></div>
            <div className="w-32 h-32 rounded-[2.5rem] bg-slate-900 border-2 border-emerald-500/30 mx-auto flex items-center justify-center mb-6 overflow-hidden shadow-2xl shadow-emerald-500/10">
              {profile?.photoURL ? (
                <img src={profile.photoURL} alt={profile.name} className="w-full h-full object-cover" />
              ) : (
                <span className="text-5xl font-black text-emerald-500">{profile?.name?.charAt(0) || 'O'}</span>
              )}
            </div>
            <h3 className="text-xl font-black text-white mb-1 uppercase tracking-tight">{profile?.name}</h3>
            <p className="text-slate-500 text-[10px] uppercase font-bold tracking-[0.2em] mb-6">{profile?.email}</p>
            
            <div className="pt-6 border-t border-white/5 space-y-4">
               <div className="flex justify-between items-center text-[9px] font-black uppercase tracking-widest text-slate-500 px-2">
                 <span>Status</span>
                 <span className="text-emerald-500">Verified Operator</span>
               </div>
               <div className="flex justify-between items-center text-[9px] font-black uppercase tracking-widest text-slate-500 px-2">
                 <span>Member Since</span>
                 <span>{profile?.createdAt ? new Date((profile as any).createdAt.seconds * 1000).toLocaleDateString() : 'N/A'}</span>
               </div>
            </div>
          </div>
        </div>

        {/* Right: Controls Area */}
        <div className="lg:col-span-2">
          <div className="glass-card rounded-[3rem] p-10 border border-white/10">
            {error && (
              <div className="mb-8 p-5 bg-rose-500/10 border border-rose-500/30 rounded-2xl text-rose-500 text-[10px] font-black text-center uppercase tracking-widest">
                {error}
              </div>
            )}
            {success && (
              <div className="mb-8 p-5 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl text-emerald-500 text-[10px] font-black text-center uppercase tracking-widest">
                {success}
              </div>
            )}

            {!isEditing ? (
              <div className="space-y-12">
                <div className="grid gap-8">
                  <div className="p-8 bg-slate-950/50 rounded-3xl border border-white/5">
                    <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-6 px-1">Institutional Records</h4>
                    <div className="space-y-6">
                       <div>
                         <div className="text-[9px] font-black text-emerald-500 uppercase tracking-widest mb-1">Assigned Alias</div>
                         <div className="text-xl font-bold text-slate-200">{profile?.name}</div>
                       </div>
                       <div>
                         <div className="text-[9px] font-black text-emerald-500 uppercase tracking-widest mb-1">Network Entry Point</div>
                         <div className="text-xl font-bold text-slate-200">{profile?.email}</div>
                       </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button 
                    onClick={() => setIsEditing(true)}
                    className="flex-1 py-4 bg-emerald-500 text-slate-950 font-black rounded-2xl text-[10px] uppercase tracking-widest hover:bg-emerald-400 transition-all shadow-xl shadow-emerald-500/10"
                  >
                    Modify Terminal Data
                  </button>
                  <button 
                    onClick={handleDeleteAccount}
                    disabled={deleteLoading}
                    className="flex-1 py-4 bg-slate-900 border border-rose-500/30 text-rose-500 font-black rounded-2xl text-[10px] uppercase tracking-widest hover:bg-rose-500 hover:text-white transition-all disabled:opacity-50"
                  >
                    {deleteLoading ? 'PURGING...' : 'PURGE ACCOUNT'}
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleUpdate} className="space-y-8 animate-in fade-in duration-300">
                <h4 className="text-xl font-black text-white uppercase tracking-tight mb-8">Override Identity Data</h4>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2.5 px-1">Updated Operator Alias</label>
                    <input 
                      type="text" 
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter new alias"
                      className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-6 py-4 text-sm font-bold text-white focus:border-emerald-500 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2.5 px-1">Photo Reference URL / Filename</label>
                    <input 
                      type="text" 
                      value={photoURL}
                      onChange={(e) => setPhotoURL(e.target.value)}
                      placeholder="https://terminal-id.jpg"
                      className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-6 py-4 text-sm font-bold text-white focus:border-emerald-500 outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <button 
                    type="submit"
                    disabled={updateLoading}
                    className="flex-1 py-4 bg-emerald-500 text-slate-950 font-black rounded-2xl text-[10px] uppercase tracking-widest hover:bg-emerald-400 transition-all shadow-xl shadow-emerald-500/10 disabled:opacity-50"
                  >
                    {updateLoading ? 'SYNCING...' : 'COMMIT CHANGES'}
                  </button>
                  <button 
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="flex-1 py-4 bg-slate-900 border border-slate-800 text-slate-400 font-black rounded-2xl text-[10px] uppercase tracking-widest hover:text-white transition-all"
                  >
                    ABORT OVERRIDE
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
