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

// Define the correct order for the cards
const correctOrder = [
  { id: 'red', name: 'Red', rgb: 'rgb(255, 0, 0)' },
  { id: 'green', name: 'Green', rgb: 'rgb(0, 255, 0)' },
  { id: 'blue', name: 'Blue', rgb: 'rgb(0, 0, 255)' },
];

// Sortable item component
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

const ShufflingGame = () => {
  // Maintain an array of card IDs for sorting
  const [items, setItems] = useState(correctOrder.map((card) => card.id));
  const [result, setResult] = useState(null);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;
    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const verifyOrder = () => {
    const isCorrect = items.every((id, index) => id === correctOrder[index].id);
    setResult(isCorrect ? 'correct' : 'incorrect');
  };

  // Create a map from id to card data for easy lookup
  const cardsMap = correctOrder.reduce((acc, card) => {
    acc[card.id] = card;
    return acc;
  }, {});

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
        <SortableContext items={items} strategy={horizontalListSortingStrategy}>
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
            {items.map((id) => (
              <SortableItem key={id} id={id} {...cardsMap[id]} />
            ))}
          </div>
        </SortableContext>
      </DndContext>
      <div style={{ textAlign: 'center', marginTop: '1rem' }}>
        <Button onClick={verifyOrder}>Verify</Button>
      </div>
      {result === 'correct' && (
        <div style={{ marginTop: '1rem', textAlign: 'center', color: 'green' }}>
          <span role="img" aria-label="tick">
            ✔
          </span>{' '}
          Correct Order!
        </div>
      )}
      {result === 'incorrect' && (
        <div style={{ marginTop: '1rem', textAlign: 'center', color: 'red' }}>
          <span role="img" aria-label="cross">
            ❌
          </span>{' '}
          Incorrect Order!
        </div>
      )}
    </Fieldset>
  );
};

export default ShufflingGame;
