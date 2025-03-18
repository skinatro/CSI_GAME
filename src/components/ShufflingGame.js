// src/components/ShufflingGame.js
import React, { useState, useEffect } from 'react';
import { DndContext, closestCenter } from '@dnd-kit/core';
import {
  SortableContext,
  horizontalListSortingStrategy,
  useSortable,
  arrayMove,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Button, Fieldset } from 'react95';

const colorOptions = [
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
  // Generate a random correct order
  const [correctOrder, setCorrectOrder] = useState([]);
  
  // Initialize correct order randomly on component mount
  useEffect(() => {
    const randomizedCorrectOrder = [...colorOptions];
    for (let i = randomizedCorrectOrder.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [randomizedCorrectOrder[i], randomizedCorrectOrder[j]] = [randomizedCorrectOrder[j], randomizedCorrectOrder[i]];
    }
    setCorrectOrder(randomizedCorrectOrder);
  }, []);

  const [cards, setCards] = useState([]);
  const [result, setResult] = useState(null); // 'correct' or 'incorrect'
  const [currentPassword, setCurrentPassword] = useState(null);

  // Password mapping based on color order
  const passwordMapping = {
    'RGB': '472108365',
    'RBG': '860317452',
    'GBR': '182370546',
    'GRB': '231807645',
    'BGR': '701586213',
    'BRG': '513247068'
  };

  // Initialize cards with a shuffled version of the correct order once it's ready
  useEffect(() => {
    if (correctOrder.length === 0) return;
    
    const shuffledCards = [...correctOrder];
    for (let i = shuffledCards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledCards[i], shuffledCards[j]] = [shuffledCards[j], shuffledCards[i]];
    }
    setCards(shuffledCards);
  }, [correctOrder]);

  // Function to determine the current order code
  const determineOrderCode = (cardArray) => {
    return cardArray.map(card => card.id.charAt(0).toUpperCase()).join('');
  };

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
    
    // If correct, determine the password based on the current order
    if (isCorrect) {
      const orderCode = determineOrderCode(cards);
      const password = passwordMapping[orderCode];
      setCurrentPassword(password);
      
      if (onSolved) {
        onSolved(password); // Pass the password to the parent component
      }
    }
  };

  // Get the expected correct order code for debugging
  const correctOrderCode = correctOrder.length ? determineOrderCode(correctOrder) : '';

  return (
    <Fieldset legend="Arrange the Cards">
      {process.env.REACT_APP_DEBUG === 'true' && (
        <div style={{ marginBottom: '1rem' }}>
          <p>
            Reference Order: <strong>{correctOrderCode}</strong>
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
          {currentPassword && (
            <p style={{ marginTop: '0.5rem' }}>Generated Password: <strong>{currentPassword}</strong></p>
          )}
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
