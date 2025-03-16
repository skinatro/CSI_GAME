// src/components/ShufflingGame.js
import React, { useState } from 'react';
import { DndContext, closestCenter } from '@dnd-kit/core';
import {
  SortableContext,
  horizontalListSortingStrategy,
  useSortable,
  arrayMove,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Button, Fieldset } from 'react95';

const correctOrder = [
  { id: 'red', name: 'Red', rgb: 'rgb(255, 0, 0)' },
  { id: 'green', name: 'Green', rgb: 'rgb(0, 255, 0)' },
  { id: 'blue', name: 'Blue', rgb: 'rgb(0, 0, 255)' },
];

function SortableItem({ id, name, rgb }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    userSelect: 'none',
    margin: '0 8px',
    cursor: 'grab',
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <div
        style={{
          width: 100,
          height: 100,
          backgroundColor: rgb,
          borderRadius: 4,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          fontWeight: 'bold',
        }}
      >
        {name}
      </div>
    </div>
  );
}

const ShufflingGame = ({ onSolved }) => {
  const [cards, setCards] = useState(
    // Shuffle the correctOrder array initially
    (() => {
      const arr = [...correctOrder];
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      return arr;
    })()
  );
  const [result, setResult] = useState(null); // 'correct' or 'incorrect'

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;
    if (active.id !== over.id) {
      setCards((cards) => {
        const oldIndex = cards.findIndex((card) => card.id === active.id);
        const newIndex = cards.findIndex((card) => card.id === over.id);
        return arrayMove(cards, oldIndex, newIndex);
      });
    }
  };

  const verifyOrder = () => {
    const isCorrect = cards.every((card, index) => card.id === correctOrder[index].id);
    setResult(isCorrect ? 'correct' : 'incorrect');
    if (isCorrect && onSolved) {
      onSolved();
    }
  };

  return (
    <Fieldset legend="Arrange the Cards">
      {process.env.REACT_APP_DEBUG === 'true' && (
        <div style={{ marginBottom: '1rem' }}>
          <p>
            Reference Order: <strong>RGB</strong>
          </p>
        </div>
      )}
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={cards.map((card) => card.id)} strategy={horizontalListSortingStrategy}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              margin: '1rem 0',
              minHeight: '150px',
              border: '2px dashed #ccc',
              padding: '10px',
            }}
          >
            {cards.map((card) => (
              <SortableItem key={card.id} id={card.id} name={card.name} rgb={card.rgb} />
            ))}
          </div>
        </SortableContext>
      </DndContext>
      <div style={{ textAlign: 'center', marginTop: '1rem' }}>
        <Button onClick={verifyOrder}>Verify</Button>
      </div>
      {result === 'correct' && (
        <div style={{ marginTop: '1rem', textAlign: 'center', color: 'green' }}>
          <span role="img" aria-label="tick">✔</span> Correct Order!
        </div>
      )}
      {result === 'incorrect' && (
        <div style={{ marginTop: '1rem', textAlign: 'center', color: 'red' }}>
          <span role="img" aria-label="cross">❌</span> Incorrect Order!
        </div>
      )}
    </Fieldset>
  );
};

export default ShufflingGame;
