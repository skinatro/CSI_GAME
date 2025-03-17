// src/components/ShufflingGame.js
import React, { useState, useEffect } from 'react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Fieldset, Button } from 'react95';

const colorOptions = [
  { id: 'red', color: '#FF0000' },
  { id: 'green', color: '#00FF00' },
  { id: 'blue', color: '#0000FF' }
];

const SortableItem = ({ id, color }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    backgroundColor: color,
    width: '100%',
    height: '60px',
    margin: '10px 0',
    cursor: 'grab',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontSize: '1.2em',
    fontWeight: 'bold',
    borderRadius: '4px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {id.charAt(0).toUpperCase() + id.slice(1)}
    </div>
  );
};

const ShufflingGame = ({ onSolved }) => {
  const [correctOrder, setCorrectOrder] = useState([]);
  const [cards, setCards] = useState([]);
  const [result, setResult] = useState(null);
  const [currentPassword, setCurrentPassword] = useState(null);

  const passwordMapping = {
    'RGB': '472108365',
    'RBG': '860317452',
    'GBR': '182370546',
    'GRB': '231807645',
    'BGR': '701586213',
    'BRG': '513247068'
  };

  useEffect(() => {
    const randomizedCorrectOrder = [...colorOptions];
    for (let i = randomizedCorrectOrder.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [randomizedCorrectOrder[i], randomizedCorrectOrder[j]] = [randomizedCorrectOrder[j], randomizedCorrectOrder[i]];
    }
    setCorrectOrder(randomizedCorrectOrder);
  }, []);

  useEffect(() => {
    if (correctOrder.length === 0) return;
    
    const shuffledCards = [...correctOrder];
    for (let i = shuffledCards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledCards[i], shuffledCards[j]] = [shuffledCards[j], shuffledCards[i]];
    }
    setCards(shuffledCards);
  }, [correctOrder]);

  const determineOrderCode = (cardArray) => {
    return cardArray.map(card => card.id.charAt(0).toUpperCase()).join('');
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

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

  const checkOrder = () => {
    const currentOrderCode = determineOrderCode(cards);
    const correctOrderCode = determineOrderCode(correctOrder);
    
    if (currentOrderCode === correctOrderCode) {
      setResult('correct');
      const password = passwordMapping[currentOrderCode];
      setCurrentPassword(password);
      if (onSolved) onSolved(password);
    } else {
      setResult('incorrect');
    }
  };

  return (
    <Fieldset legend="Card Shuffling Game">
      <div style={{ marginBottom: '1rem' }}>
        <p>Arrange the cards in the correct order:</p>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={cards.map(card => card.id)} strategy={verticalListSortingStrategy}>
            <div style={{ margin: '1rem 0' }}>
              {cards.map((card) => (
                <SortableItem key={card.id} id={card.id} color={card.color} />
              ))}
            </div>
          </SortableContext>
        </DndContext>
        <Button onClick={checkOrder}>
          Check Order
        </Button>
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
