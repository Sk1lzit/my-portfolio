import FadeIn from "@/components/FadeIn";

export const metadata = {
  title: "Согласие на обработку персональных данных — Sk1lz",
};

export default function Terms() {
  return (
    <section className="max-w-3xl mx-auto px-6 py-32 relative z-10">
      <FadeIn>
        <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-4 bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent">
          Согласие на обработку персональных данных
        </h1>
        <p className="text-purple-400 text-center text-sm mb-16 opacity-70">
          Дата последнего обновления: 25 сентября 2026 г.
        </p>
      </FadeIn>

      <div className="space-y-8 text-gray-400 leading-relaxed">
        <p>
          Настоящим я, Пользователь Сайта, действуя свободно, своей волей и в своём интересе,
          в соответствии с требованиями статьи 9 Федерального закона от 27.07.2006 № 152-ФЗ
          «О персональных данных», даю согласие Администрации Сайта на обработку моих
          персональных данных.
        </p>

        <div>
          <h2 className="text-2xl font-bold text-purple-300 mb-3 pb-2 border-b border-purple-500/20">
            1. Перечень персональных данных
          </h2>
          <ul className="list-disc ml-6 space-y-1">
            <li>Фамилия, имя (при наличии — отчество);</li>
            <li>Контактный телефон;</li>
            <li>Адрес электронной почты;</li>
            <li>Данные мессенджера Telegram;</li>
            <li>Иные данные, добровольно предоставленные Пользователем.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-purple-300 mb-3 pb-2 border-b border-purple-500/20">
            2. Цели обработки
          </h2>
          <ul className="list-disc ml-6 space-y-1">
            <li>Связи с Пользователем для обсуждения заказов и оказания услуг;</li>
            <li>Ответов на запросы и обращения Пользователя;</li>
            <li>Предоставления сервисного и информационно-справочного обслуживания.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-purple-300 mb-3 pb-2 border-b border-purple-500/20">
            3. Перечень действий с персональными данными
          </h2>
          <p>
            Согласие даётся на совершение следующих действий (операций): сбор, запись, систематизация,
            накопление, хранение, уточнение, извлечение, использование, передачу, обезличивание,
            блокирование, удаление, уничтожение персональных данных.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-purple-300 mb-3 pb-2 border-b border-purple-500/20">
            4. Срок действия согласия
          </h2>
          <p>
            Настоящее согласие действует со дня его предоставления (проставления отметки в форме на
            Сайте) до достижения целей обработки. Согласие может быть отозвано Пользователем в любое
            время путём направления письменного уведомления.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-purple-300 mb-3 pb-2 border-b border-purple-500/20">
            5. Порядок отзыва согласия
          </h2>
          <p className="mb-3">
            Согласие может быть отозвано путём направления уведомления по следующим контактам:
          </p>
          <ul className="list-disc ml-6 space-y-1">
            <li>Email: <a href="mailto:inemklyb@mail.ru" className="text-purple-400 hover:underline">inemklyb@mail.ru</a></li>
            <li>Telegram: <a href="https://t.me/Sk1lzzz" target="_blank" rel="noopener" className="text-purple-400 hover:underline">@Sk1lzzz</a></li>
            <li>Discord: <a href="https://discord.com/users/670944110630273024" target="_blank" rel="noopener" className="text-purple-400 hover:underline">_sk1lz</a></li>
          </ul>
          <p className="mt-4">
            Обработка прекращается в течение <strong className="text-white">30 дней</strong> с момента
            получения уведомления.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-purple-300 mb-3 pb-2 border-b border-purple-500/20">
            6. Подтверждение
          </h2>
          <p>
            Проставляя отметку (галочку) в форме обратной связи на Сайте, Пользователь подтверждает,
            что ознакомлен с настоящим Согласием и Политикой конфиденциальности, согласен с их
            условиями и даёт своё согласие на обработку персональных данных.
          </p>
        </div>
      </div>
    </section>
  );
}