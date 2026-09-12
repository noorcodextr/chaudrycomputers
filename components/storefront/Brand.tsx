import Image from "next/image";


export function Brand({ footer = false }: { footer?: boolean }) {
  return (
  <a
    href="/"
    className="flex h-14 w-[150px] items-center justify-center sm:h-16 sm:w-[175px]"
  > 
  <div className="font-display text-2xl font-black uppercase tracking-tight text-black">
      <Image
        src={footer ? "/footerlogo.png" : "/logo.png"}
        alt="Chaudry Computers"
        width={100}
        height={40}
      />
      </div> 
      </a>
  );
}