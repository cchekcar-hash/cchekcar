import Marquee from 'react-fast-marquee';
import styles from './DiscountBlock.module.scss';

interface DiscountBlockProps {
  right: 'left' | 'right';
}

export default function DiscountBlock({ right }: DiscountBlockProps) {
  const textsTrusted = {
    texts: [
      'Точна ціна до початку робіт',
      'Показуємо несправність наочно',
      'Повертаємо старі запчастини',
      'Без зайвих робіт',
      'Документи на виконані роботи',
      'Двигуни BMW – наш профіль',
    ],
  };

  return (
    <div className={styles.discountBlock}>
      <Marquee direction={right} speed={50} gradient={false}>
        {textsTrusted.texts.map((text, index) => (
          <div key={index} className={styles.trustedScreenBlock}>
            <p>{text}</p>
          </div>
        ))}
      </Marquee>
    </div>
  );
}
