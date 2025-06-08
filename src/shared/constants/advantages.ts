import { IoMdTime, IoMdBook } from "react-icons/io";
import { IoCodeSlashOutline } from "react-icons/io5";

const advantages = [
  {
    id: 1,
    title: "Обучение в любое время",
    description:
      "Вы можете учиться в удобное для вас время и в любом месте. Доступ к платформе открыт 24/7.",
    icon: IoMdTime,
  },
  {
    id: 2,
    title: "Полный доступ к материалам бесплатно",
    description:
      "Все курсы, видеолекции и примеры доступны абсолютно бесплатно.",
    icon: IoMdBook,
  },
  {
    id: 3,
    title: "Интерактивный редактор кода",
    description:
      "Прямо в лекциях вы сможете писать, проверять код и видеть результат без необходимости установки дополнительного ПО.",
    icon: IoCodeSlashOutline,
  },
];

export default advantages;
