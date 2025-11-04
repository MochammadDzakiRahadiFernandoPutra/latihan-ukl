export const metadata = {
  title: 'Login | Presensi Online',
  description: 'Halaman Login Aplikasi Presensi Online',
};

type PropsLayout = { children: React.ReactNode };

const LoginLayout = ({ children }: PropsLayout) => {
  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      {children}
    </div>
  );
};

export default LoginLayout;
