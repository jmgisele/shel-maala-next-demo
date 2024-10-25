interface HeaderProps {
  src: string;
}

export default function ImageHeader({ src }: HeaderProps) {
  return (
    <div className="relative">
      <div className="absolute top-0 right-2 lg:top-4 lg:right-6 text-white">
        בס״ד
      </div>
      <img className="flex-grow object-cover h-full w-full" src={src} />
    </div>
  );
}
