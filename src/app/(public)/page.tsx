import Image from "next/image";

import HeroImage from "@/assets/hero.png";
import BenefitsImg from "@/assets/benefitsImg.jpg";
import CtaArrow from "@/assets/cta-arrow.png";

import { AnimatedCounter } from "@/components/animated-counter";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { AlarmClock, BookCopy, CalendarFold, Repeat } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="space-y-32 py-16">
      <div>
        {/* Hero Section */}
        <section className="flex flex-col lg:flex-row gap-10 lg:gap-0 lg:justify-between">
          <div className="flex flex-col gap-10 flex-1 text-center lg:text-start">
            <h1 className="text-7xl font-extrabold text-secondary leading-[120%] tracking-tighter">
              Facilite Seu Trabalho Com <br /> Nossos{" "}
              <span className="text-primary">Planos De Aula</span> <br /> Para{" "}
              <span className="text-primary">Educação Infantil</span>!
            </h1>
            <p className="text-xl font-semibold text-foreground/90">
              Desde o acolhimento até atividades lúdicas, <br /> facilitamos o
              dia a dia dos professores
            </p>
            <div className="w-full grid place-items-center lg:place-items-start">
              <Button className="rounded-full w-44 h-10 text-base">
                Ver produtos
              </Button>
            </div>
          </div>
          <div className="relative w-[500px] h-[619px] grid place-items-center">
            <Image
              src={"/elipse.svg"}
              alt="elipse"
              width={500}
              height={500}
              priority
              className="absolute z-10 -top-10"
            />
            <Image
              src={HeroImage}
              alt="image"
              width={450}
              height={500}
              priority
              className="absolute z-30 -top-14"
            />
          </div>
        </section>

        {/* Feature Stats Bar  */}
        <div className="h-28 flex">
          <div className="h-28 w-full bg-primary text-white absolute left-0 z-40">
            <div className="h-full flex items-center justify-center gap-32">
              <h2 className="text-2xl font-extrabold flex flex-col items-center">
                <AnimatedCounter from={0} to={10} duration={1000} /> Planos De
                Aulas
              </h2>
              <h2 className="text-2xl font-extrabold flex flex-col items-center">
                <AnimatedCounter from={0} to={35} duration={1000} />
                Atividades
              </h2>
              <h2 className="text-2xl font-extrabold flex flex-col items-center">
                <AnimatedCounter from={0} to={20} duration={1000} />
                Horas Economizadas
              </h2>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <section className="flex flex-col lg:flex-row items-center justify-around h-fit">
        <div className="relative grid place-items-center w-[600px] h-[400px]">
          <div className="absolute w-[600px] h-[400px] border-l-[5px] border-t-[5px] border-dashed rounded-[30px]" />
          <div className="absolute w-[600px] h-[400px] border-r-[5px] border-b-[5px] border-dashed border-primary rounded-[30px]" />

          <div className="w-[570px] h-[370px] relative">
            <Image
              src={BenefitsImg}
              alt=""
              fill
              className="absolute z-10 rounded-3xl"
            />
          </div>
        </div>
        <div className="space-y-10">
          <h2 className="text-5xl font-extrabold text-secondary leading-[120%]">
            Benefícios Dos Nossos <br />
            <span className="text-primary">Planos De Aula!</span>
          </h2>
          <div className="space-y-6">
            <div className="flex items-center gap-4 text-foreground/90">
              <div className="bg-secondary w-14 h-14 rounded-full grid place-items-center">
                <AlarmClock className="size-7 text-background" />
              </div>
              <div>
                <p className="text-xl font-bold">Economia De Tempo</p>
                <p>Nossos planos prontos economizam horas de preparação.</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-foreground/90">
              <div className="bg-primary w-14 h-14 rounded-full grid place-items-center">
                <BookCopy className="size-7 text-background" />
              </div>
              <div>
                <p className="text-xl font-bold">Ensino Estruturado</p>
                <p>
                  Guia detalhado para cada etapa do desenvolvimento infantil.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-foreground/90">
              <div className="bg-secondary w-14 h-14 rounded-full grid place-items-center">
                <CalendarFold className="size-7 text-background" />
              </div>
              <div>
                <p className="text-xl font-bold">Planos Mensais</p>
                <p>Cada plano é projeto para um mês inteiro de atividades.</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-foreground/90">
              <div className="bg-primary w-14 h-14 rounded-full grid place-items-center">
                <Repeat className="size-7 text-background" />
              </div>
              <div>
                <p className="text-xl font-bold">Suporte Contínuo</p>
                <p>
                  Atualizações regulares e novos recursos para enriquecer suas
                  práticas educacionais.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="flex flex-col lg:flex-row items-center justify-around h-[595px]">
        <div className="bg-primary absolute left-0 w-full h-[595px] bg-cta-pattern" />
        <div className="w-full h-[300px] border-4 rounded-xl bg-background z-30 flex justify-between px-24 items-center relative">
          <div className="grid place-items-center gap-3">
            <h4 className="font-black text-3xl text-secondary leading-[120%]">
              Seu Primeiro{" "}
              <span className="text-primary">
                Plano <br /> de Aula
              </span>{" "}
              por Apenas:
            </h4>
            <p className="text-5xl text-destructive font-extrabold">R$9,99</p>
            <Button className="w-52 h-14 text-xl rounded-xl">Ver Planos</Button>
          </div>
          <div className="relative w-[320px] h-[120px] grid place-items-center -rotate-[148deg]">
            <Image
              src={CtaArrow}
              alt="image"
              width={320}
              height={120}
              className="absolute z-30 "
            />
          </div>
          <div>
            <h3 className="text-5xl font-black text-secondary leading-[120%]">
              Explore Nossos{" "}
              <span className="text-primary">
                Planos de <br /> Aula
              </span>{" "}
              Agora!
            </h3>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="flex flex-col items-center justify-around w-full gap-5">
        <h2 className="text-5xl font-extrabold text-secondary leading-[120%]">
          FAQ (<span className="text-primary">Perguntas Frequentes</span>)
        </h2>
        <Accordion type="single" collapsible className="w-full px-10">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-2xl ">
              Para quem são os planos de aula?
            </AccordionTrigger>
            <AccordionContent className="text-xl leading-relaxed">
              Nossos planos de aula são ideais para professores de educação
              infantil que buscam facilitar seu trabalho diário e proporcionar
              atividades de qualidade. Além disso, também são úteis para pais
              que desejam complementar a educação de seus filhos em casa.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="text-2xl ">
              Como faço para adquirir os planos de aula?
            </AccordionTrigger>
            <AccordionContent className="text-xl leading-relaxed">
              Adquirir nossos planos de aula é simples! Basta navegar até a
              seção de{" "}
              <Link href={"/produtos"} className="font-semibold text-blue-500">
                produtos
              </Link>
              , selecionar o plano desejado e seguir o processo de compra. Após
              a confirmação do pagamento, o plano será enviado diretamente para
              o seu e-mail em formato PDF.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="text-2xl ">
              Quais são os benefícios de usar planos de aula prontos?
            </AccordionTrigger>
            <AccordionContent className="text-xl leading-relaxed">
              Usar planos de aula prontos economiza tempo na preparação, oferece
              atividades diversificadas e garante uma abordagem pedagógica
              consistente e divertida para as crianças. Isso permite que você se
              concentre mais na execução e no acompanhamento dos alunos.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger className="text-2xl ">
              Posso personalizar os planos de aula?
            </AccordionTrigger>
            <AccordionContent className="text-xl leading-relaxed">
              Sim! Embora nossos planos sejam prontos para uso, incentivamos a
              personalização para atender às necessidades específicas da sua
              turma. Você pode adaptar as atividades conforme o desenvolvimento
              e interesse das crianças.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-5">
            <AccordionTrigger className="text-2xl ">
              Os planos de aula são alinhados com a Base Nacional Comum
              Curricular (BNCC)?
            </AccordionTrigger>
            <AccordionContent className="text-xl leading-relaxed">
              Sim, todos os nossos planos de aula são elaborados com base nas
              diretrizes da BNCC, garantindo que as atividades estejam alinhadas
              com os objetivos de aprendizagem esperados para a educação
              infantil.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-6">
            <AccordionTrigger className="text-2xl ">
              Em que formato os planos de aula são disponibilizados?
            </AccordionTrigger>
            <AccordionContent className="text-xl leading-relaxed">
              Nossos planos de aula são disponibilizados em formato PDF,
              garantindo fácil acesso e impressão. Você pode acessar o material
              em qualquer dispositivo, como computador, tablet ou smartphone.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-7">
            <AccordionTrigger className="text-2xl ">
              Tenho outras dúvidas, quem pode me respondê-las?
            </AccordionTrigger>
            <AccordionContent className="text-xl leading-relaxed">
              e você tiver outras dúvidas, não hesite em entrar em contato
              conosco através do nosso formulário de contato ou pelo e-mail
              seu-email@exemplo.com. Estamos aqui para ajudar!
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>
    </main>
  );
}
