import { data } from '../../lib/data.js';
import Modal from '../../components/Modal.jsx';
import ModalWrapClient from '../../components/ModalWrapClient.jsx';
import '../../components/Modal.css';

export async function generateStaticParams() {
  return data;
}

export async function generateMetadata({ params }) {
  const id = (await params).id;
  const item = data.find((obj) => obj.id === id);
  return {
    title: `${item.title} (${item.authorFull}) | Extracts`,
    description: 'Антология отрывков философских текстов',
  };
}

export default async function BookPage({ params }) {
  const id = (await params).id;

  return (
    <ModalWrapClient>
      <Modal id={id} />
    </ModalWrapClient>
  );
}
