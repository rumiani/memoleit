import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getHighlightedText } from '@/utils/clipboard';
import Modal from '../model/Modal';

const ShareTargetPage = () => {
  const router = useRouter();
  const [sharedData, setSharedData] = useState({ title: '', text: '', url: '' });
  const [highlightedText, setHighlightedText] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(true);

  useEffect(() => {
    const fetchHighlightedText = async () => {
      const text = await getHighlightedText();
      setHighlightedText(text);
    };
    fetchHighlightedText();

    // if (navigator.share) {
      const { name, description, link } = router.query;
      setSharedData({ title: name as string, text: description as string, url: link as string });
    // }
  }, [router.query]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted', sharedData);
    setIsModalOpen(false);
  };

  return (
    <div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h1>Add Highlighted Word</h1>
        <form onSubmit={handleFormSubmit}>
          <label>
            Highlighted Text:
            <textarea
              value={highlightedText || ''}
              readOnly
            />
          </label>
          <br />
          <label>
            Title:
            <input
              type="text"
              value={sharedData.title}
              onChange={(e) => setSharedData({ ...sharedData, title: e.target.value })}
            />
          </label>
          <br />
          <label>
            Text:
            <textarea
              value={sharedData.text}
              onChange={(e) => setSharedData({ ...sharedData, text: e.target.value })}
            />
          </label>
          <br />
          <label>
            URL:
            <input
              type="text"
              value={sharedData.url}
              onChange={(e) => setSharedData({ ...sharedData, url: e.target.value })}
            />
          </label>
          <br />
          <button type="submit">Submit</button>
        </form>
      </Modal>
    </div>
  );
};

export default ShareTargetPage;
