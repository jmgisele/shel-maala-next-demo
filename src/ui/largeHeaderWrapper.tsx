interface HeaderProps {
  title: string;
  children: React.ReactNode;
}

export default function LargeHeaderWrapper({
  title,
  children,
}: HeaderProps) {
  return (
    <main className="bg-eggshell p-5 container max-w-6xl flex flex-col flex-grow">
      <header className="mb-3 border-b-2 border-red">
        <h1 className="font-serif text-4xl lg:text-8xl">{title}</h1>
      </header>
      {children}
    </main>
  );
}
