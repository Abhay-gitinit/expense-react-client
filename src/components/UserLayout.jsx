import UserHeader from "./UserHeader";

function UserLayout({ children }) {
  return (
    <>
      <UserHeader />
      <main className="container py-4">{children}</main>
    </>
  );
}

export default UserLayout;