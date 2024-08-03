import { Instagram, Mail, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full py-4 md:py-8 bg-primary text-white absolute left-0 z-40 text-center flex justify-around">
      <div className="flex flex-col items-center gap-4">
        <Link
          href="#"
          className="flex justify-center items-center text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <Image
            src="/logo-mono.svg"
            width={200}
            height={30}
            alt="planjaKids Logo"
          />
        </Link>
        <div className="space-y-2">
          <p className="flex items-center gap-2">
            <Mail />
            contato@planejakids.com
          </p>
          <p className="flex items-center gap-2">
            <Phone />
            (XX) XXXX-XXXX
          </p>
        </div>
        <div className="w-12 h-12 rounded-full p-1 bg-secondary grid place-items-center">
          <Instagram className="text-background" />
        </div>
      </div>
      <div className="flex flex-col items-center justify-center gap-2">
        <ul className="flex gap-4 lg:text-lg">
          <li>
            <Link href="#" className="hover:underline">
              Página Inicial
            </Link>
          </li>
          -
          <li>
            <Link href="#" className="hover:underline">
              Produtos
            </Link>
          </li>
          -
          <li>
            <Link href="#" className="hover:underline">
              Sobre
            </Link>
          </li>
          -
          <li>
            <Link href="#" className="hover:underline">
              Contato
            </Link>
          </li>
        </ul>
        <ul className="flex gap-4 lg:text-lg">
          <li>
            <Link href="#" className="hover:underline">
              Termos e condições
            </Link>
          </li>
          -
          <li>
            <Link href="#" className="hover:underline">
              Politica de privacidade
            </Link>
          </li>
        </ul>
      </div>
      <div className="flex items-end">
        <span className="text-sm flex gap-1 justify-end">
          {new Date().getFullYear()} Copyright &copy;
          <Link href="#" className="hover:underline">
            PlanejKids™.
          </Link>{" "}
          Todos os direitos reservados.
        </span>
      </div>
    </footer>
  );
}
