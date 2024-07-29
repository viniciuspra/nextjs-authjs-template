import { logout } from "@/actions/logout";

interface LogoutProps {
  children: React.ReactNode;
}

export function LogoutButton({ children }: LogoutProps) {
  const onClick = () => {
    logout();
  };

  return (
    <span className="cursor-pointer w-full h-full" onClick={onClick}>
      {children}
    </span>
  );
}
