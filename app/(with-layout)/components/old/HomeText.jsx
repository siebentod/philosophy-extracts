import Link from 'next/link';

function HomeText() {
  return (
    <div className="modal-content">
      <div className="modal-scrollable-content">
        <p>Гимны Ригведы в переводе Т.Я. Елизаренковой</p>
        <div style={{ marginTop: '10px' }}>
          Примечательное:
          <li>
            <Link href="/10_90">X, 90 О сотворении мира из Пуруши</Link>
          </li>
          <li>
            <Link href="/10_129">X, 129. Космогония («Одно»)</Link>
          </li>
          <li>
            <Link href="/10_190">X, 190. Космический жар</Link>
          </li>
          <li>
            <Link href="/10_121">X, 121. К неизвестному богу (Праджапати)</Link>
          </li>
          <li style={{ marginTop: '5px' }}>
            <Link href="/6_64">VI, 64. К Ушас (утренней заре)</Link>
          </li>
          <li>
            <Link href="/10_127">X, 127. К Ратри (ночи)</Link>
          </li>
          <li>
            <Link href="/10_146">X, 146. К Араньяни (лесу)</Link>
          </li>
          <li>
            <Link href="/6_70">VI, 70. К Небу-и-Земле</Link>
          </li>
          <li>
            <Link href="/1_90">I, 90. Ко Всем-Богам</Link>
          </li>
          <li style={{ marginTop: '5px' }}>
            <Link href="/9_112">IX, 112. О хотениях</Link>
          </li>
          <li>
            <Link href="/10_159">X, 159. Самовосхваление женщины</Link>
          </li>
          <li>
            <Link href="/10_10">X, 10. Яма и Ями</Link>
          </li>
          <li>
            <Link href="/10_183">X, 183. На рождение сына</Link>
          </li>
          <li>
            <Link href="/10_18">X, 18. Похоронный гимн</Link>
          </li>
          <li>
            <Link href="/10_135">
              X, 135. Разговор мальчика и умершего отца
            </Link>
          </li>
        </div>
        <p>
          Текст с благодарностью взят{' '}
          <a href="https://samskrtam.ru/parallel-corpus/rigveda.html">
            отсюда<span className="external-link"></span>
          </a>
          .
        </p>
      </div>
    </div>
  );
}

export default HomeText;
