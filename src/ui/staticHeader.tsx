import clsx from "clsx";

interface HeaderProps {
  title: string;
  addClasses?: string;
}

export default function StaticHeader({ title, addClasses }: HeaderProps) {
  return (
    <header className={clsx("border-b-2 border-red", addClasses)}>
      <h1>{title}</h1>
    </header>
  );
}
