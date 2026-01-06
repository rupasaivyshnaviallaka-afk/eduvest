
import React, { useState } from 'react';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
  sendPasswordResetEmail,
  signOut,
  AuthError,
  GoogleAuthProvider,
  signInWithPopup,
  User
} from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../firebase";

const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showVerification, setShowVerification] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [passwordResetSent, setPasswordResetSent] = useState(false);
  const [verificationEmail, setVerificationEmail] = useState('');
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [resendStatus, setResendStatus] = useState<string | null>(null);

  const syncUserToFirestore = async (user: User, customName?: string) => {
    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);
    
    if (!userSnap.exists()) {
      await setDoc(userRef, {
        uid: user.uid,
        name: customName || user.displayName || "Operator",
        email: user.email,
        photoURL: user.photoURL || null,
        createdAt: serverTimestamp()
      });
    }
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      // In a real app we'd upload to Storage, here we use a placeholder or the local preview string
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const handleSwitchToSignIn = () => {
    setIsLogin(true);
    setShowVerification(false);
    setShowForgotPassword(false);
    setPasswordResetSent(false);
    setError(null);
    setResendStatus(null);
    setPassword('');
    setConfirmPassword('');
  };

  const handleGoogleSignIn = async () => {
    setError(null);
    setLoading(true);
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      
      // Ensure firestore document exists
      await syncUserToFirestore(user);

      if (!user.emailVerified) {
        await sendEmailVerification(user);
        setVerificationEmail(user.email || '');
        await signOut(auth);
        setShowVerification(true);
      }
    } catch (err: any) {
      if (err.code !== 'auth/popup-closed-by-user') {
        setError(err.message || "Google Authentication failed");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResendEmail = async () => {
    setResendStatus(null);
    try {
      if (auth.currentUser) {
        await sendEmailVerification(auth.currentUser);
        setResendStatus("Email Sent!");
      } else {
        setError("Session expired. Please sign in again to request a new link.");
        setShowVerification(false);
      }
    } catch (err: any) {
      setResendStatus("Failed to resend. Try again later.");
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      setPasswordResetSent(true);
    } catch (err) {
      const authErr = err as AuthError;
      setError(authErr.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (isLogin) {
        try {
          const userCredential = await signInWithEmailAndPassword(auth, email, password);
          const user = userCredential.user;
          
          await user.reload();
          
          // Ensure firestore document exists (for users created before firestore was added)
          await syncUserToFirestore(user);

          if (!user.emailVerified) {
            await sendEmailVerification(user);
            setVerificationEmail(user.email || email);
            await signOut(auth);
            setShowVerification(true);
            setLoading(false);
            return;
          }
        } catch (err) {
          const authErr = err as AuthError;
          if (
            authErr.code === 'auth/wrong-password' || 
            authErr.code === 'auth/user-not-found' || 
            authErr.code === 'auth/invalid-credential' ||
            authErr.code === 'auth/invalid-email'
          ) {
            setError("Email or Password Incorrect");
          } else {
            setError(authErr.message);
          }
        }
      } else {
        if (password !== confirmPassword) {
          setError("Passwords do not match");
          setLoading(false);
          return;
        }
        
        try {
          const userCredential = await createUserWithEmailAndPassword(auth, email, password);
          const user = userCredential.user;
          
          await updateProfile(user, {
            displayName: name
          });

          // Create Firestore Document
          await syncUserToFirestore(user, name);

          await sendEmailVerification(user);
          setVerificationEmail(email);
          await signOut(auth);
          setShowVerification(true);
        } catch (err) {
          const authErr = err as AuthError;
          if (authErr.code === 'auth/email-already-in-use') {
            setError("User already exists. Sign in?");
          } else {
            setError(authErr.message);
          }
        }
      }
    } catch (err: any) {
      setError(err.message || "An unexpected terminal error occurred");
    } finally {
      setLoading(false);
    }
  };

  if (passwordResetSent) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-20 relative bg-[#020617]">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 blur-[150px] rounded-full -z-10"></div>
        <div className="w-full max-w-md glass-card rounded-[3rem] p-12 border border-white/10 shadow-2xl text-center animate-in zoom-in-95 duration-500">
          <div className="w-20 h-20 bg-emerald-500/20 rounded-3xl mx-auto flex items-center justify-center mb-8">
            <svg className="w-10 h-10 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 className="text-3xl font-black uppercase tracking-tighter mb-4 text-white">Reset Link Sent</h2>
          <p className="text-slate-400 text-sm leading-relaxed mb-10">
            We sent you a password change link to <span className="text-emerald-400 font-bold">{email}</span>. Check your inbox and follow the instructions.
          </p>
          <button 
            onClick={handleSwitchToSignIn}
            className="w-full py-5 bg-emerald-500 text-slate-950 font-black rounded-2xl text-[11px] uppercase tracking-[0.25em] shadow-2xl shadow-emerald-500/20 hover:bg-emerald-400 transition-all active:scale-[0.98]"
          >
            Sign In
          </button>
        </div>
      </div>
    );
  }

  if (showForgotPassword) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-20 relative bg-[#020617]">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 blur-[150px] rounded-full -z-10"></div>
        <div className="w-full max-w-md glass-card rounded-[3rem] p-8 lg:p-12 border border-white/10 shadow-2xl animate-in zoom-in-95 duration-500">
          <div className="text-center mb-10">
            <div className="w-14 h-14 bg-slate-900 border border-slate-800 rounded-2xl mx-auto flex items-center justify-center font-black text-emerald-500 text-2xl mb-6">?</div>
            <h2 className="text-4xl font-black uppercase tracking-tighter mb-2 text-white">Reset Terminal</h2>
            <p className="text-slate-500 text-sm font-medium">Request a secure access key override link</p>
          </div>
          
          {error && (
            <div className="mb-8 p-5 bg-rose-500/10 border border-rose-500/30 rounded-2xl text-rose-500 text-xs font-black text-center uppercase tracking-widest">
              {error}
            </div>
          )}

          <form onSubmit={handleResetPassword} className="space-y-6">
            <div>
              <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2.5 px-1">Email Terminal</label>
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="id@eduvest.terminal"
                className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-6 py-4 text-sm font-bold text-white focus:border-emerald-500 outline-none transition-all"
              />
            </div>
            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-5 bg-emerald-500 text-slate-950 font-black rounded-2xl text-[11px] uppercase tracking-[0.25em] shadow-2xl shadow-emerald-500/20 hover:bg-emerald-400 transition-all active:scale-[0.98] disabled:opacity-50"
            >
              {loading ? 'Requesting...' : 'Get Reset Link'}
            </button>
          </form>

          <div className="mt-10 text-center">
            <button 
              onClick={handleSwitchToSignIn}
              className="text-slate-500 font-black uppercase tracking-widest text-[10px] hover:text-white transition-colors"
            >
              Return to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (showVerification) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-20 relative bg-[#020617]">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 blur-[150px] rounded-full -z-10"></div>
        <div className="w-full max-w-md glass-card rounded-[3rem] p-12 border border-white/10 shadow-2xl text-center animate-in zoom-in-95 duration-500">
          <div className="w-20 h-20 bg-emerald-500/20 rounded-3xl mx-auto flex items-center justify-center mb-8">
            <svg className="w-10 h-10 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h2 className="text-3xl font-black uppercase tracking-tighter mb-4 text-white">Identity Check</h2>
          <p className="text-slate-400 text-sm leading-relaxed mb-8">
            We have sent a verification email to <span className="text-emerald-400 font-bold">{verificationEmail}</span>. Please verify your email and then log in.
          </p>
          
          <div className="space-y-4">
            <button 
              onClick={handleSwitchToSignIn}
              className="w-full py-5 bg-emerald-500 text-slate-950 font-black rounded-2xl text-[11px] uppercase tracking-[0.25em] shadow-2xl shadow-emerald-500/20 hover:bg-emerald-400 transition-all active:scale-[0.98]"
            >
              Go to Login
            </button>
            
            <button 
              onClick={handleResendEmail}
              className="text-[10px] font-black text-slate-500 uppercase tracking-widest hover:text-white transition-colors"
            >
              {resendStatus || "Resend Verification Link"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20 relative bg-[#020617]">
      {/* Background decoration */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 blur-[150px] rounded-full -z-10"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 blur-[150px] rounded-full -z-10"></div>

      <div className="w-full max-w-md glass-card rounded-[3rem] p-8 lg:p-12 border border-white/10 shadow-2xl animate-in zoom-in-95 duration-500">
        <div className="text-center mb-10">
          <div className="w-14 h-14 bg-emerald-500 rounded-2xl mx-auto flex items-center justify-center font-black text-slate-950 text-2xl mb-6 shadow-lg shadow-emerald-500/30">E</div>
          <h2 className="text-4xl font-black uppercase tracking-tighter mb-2 text-white">
            {isLogin ? 'Welcome Back' : 'Join Precision'}
          </h2>
          <p className="text-slate-500 text-sm font-medium">
            {isLogin ? 'Enter your credentials to access your terminal' : 'Establish your institutional-grade account'}
          </p>
        </div>

        {error && (
          <div className="mb-8 p-5 bg-rose-500/10 border border-rose-500/30 rounded-2xl text-rose-500 text-xs font-black text-center uppercase tracking-widest animate-in fade-in slide-in-from-top-4">
            {error}
            {error === "User already exists. Sign in?" && (
              <button 
                type="button"
                onClick={handleSwitchToSignIn}
                className="block mx-auto mt-3 text-emerald-400 underline hover:text-emerald-300 transition-colors"
              >
                Click here to Sign In
              </button>
            )}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {!isLogin && (
            <>
              <div className="flex justify-center mb-8">
                <label className="relative group cursor-pointer">
                  <div className={`w-24 h-24 rounded-3xl border-2 border-dashed border-slate-700 flex items-center justify-center overflow-hidden transition-all group-hover:border-emerald-500/50 ${photoPreview ? 'border-none' : ''}`}>
                    {photoPreview ? (
                      <img src={photoPreview} alt="Avatar" className="w-full h-full object-cover" />
                    ) : (
                      <div className="text-slate-600 group-hover:text-emerald-500 text-[10px] text-center font-black uppercase tracking-widest leading-tight">
                        Profile<br/>Photo
                      </div>
                    )}
                  </div>
                  <input type="file" className="hidden" accept="image/*" onChange={handlePhotoChange} />
                  <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-slate-950 rounded-xl p-2 shadow-xl opacity-0 group-hover:opacity-100 transition-all transform scale-75 group-hover:scale-100">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" /></svg>
                  </div>
                </label>
              </div>

              <div>
                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2.5 px-1">Full Name</label>
                <input 
                  type="text" 
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Operator Name"
                  className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-6 py-4 text-sm font-bold text-white focus:border-emerald-500 outline-none transition-all placeholder:text-slate-800"
                />
              </div>
            </>
          )}

          <div>
            <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2.5 px-1">Email Terminal</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="id@eduvest.terminal"
              className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-6 py-4 text-sm font-bold text-white focus:border-emerald-500 outline-none transition-all placeholder:text-slate-800"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2.5 px-1">
              <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest">Access Key</label>
              {isLogin && (
                <button 
                  type="button"
                  onClick={() => setShowForgotPassword(true)}
                  className="text-[10px] font-black text-emerald-500 uppercase tracking-widest hover:text-emerald-400"
                >
                  Forgot Key?
                </button>
              )}
            </div>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-6 py-4 text-sm font-bold text-white focus:border-emerald-500 outline-none transition-all placeholder:text-slate-800"
            />
          </div>

          {!isLogin && (
            <div>
              <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2.5 px-1">Verify Access Key</label>
              <input 
                type="password" 
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-6 py-4 text-sm font-bold text-white focus:border-emerald-500 outline-none transition-all placeholder:text-slate-800"
              />
            </div>
          )}

          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-5 bg-emerald-500 text-slate-950 font-black rounded-2xl text-[11px] uppercase tracking-[0.25em] shadow-2xl shadow-emerald-500/20 hover:bg-emerald-400 transition-all active:scale-[0.98] disabled:opacity-50"
          >
            {loading ? 'Decrypting...' : (isLogin ? 'Sign In' : 'Establish Account')}
          </button>
        </form>

        <div className="my-8 flex items-center space-x-4">
          <div className="h-px flex-1 bg-slate-800"></div>
          <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">OR</span>
          <div className="h-px flex-1 bg-slate-800"></div>
        </div>

        <button 
          type="button"
          onClick={handleGoogleSignIn}
          disabled={loading}
          className="w-full py-4 bg-slate-900 border border-slate-800 text-white font-black rounded-2xl text-[10px] uppercase tracking-widest flex items-center justify-center space-x-3 hover:bg-slate-800 transition-all active:scale-[0.98] disabled:opacity-50"
        >
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5" />
          <span>{isLogin ? 'Sign In' : 'Sign Up'} with Google</span>
        </button>

        <div className="mt-10 text-center">
          <p className="text-slate-500 text-xs font-medium">
            {isLogin ? "No terminal access?" : "Account already active?"}{' '}
            <button 
              type="button"
              onClick={() => { setIsLogin(!isLogin); setError(null); }}
              className="text-emerald-500 font-black uppercase tracking-widest text-[10px] ml-2 hover:text-emerald-400 transition-colors"
            >
              {isLogin ? 'Request Access' : 'Sign In'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
