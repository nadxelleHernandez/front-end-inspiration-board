import React from 'react';
import NoteCard from './Card';
import CardList from './CardList';
import SelectedBoard from './SelectedBoard';
import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render, screen } from "@testing-library/react"
import NewCardForm from './NewCardForm';


const foodCards = [
    {
        id: 1,
        boardId: 1,
        message: 'I love pho!!',
        likes: 9
    },
    {
        id: 2,
        boardId: 2,
        message: 'I love bubble tea!',
        likes: 0
    },

];

const musicCards = [
    {
        id: 1,
        boardId: 2,
        message: 'Kpop is the best',
        likes: 2
    },
    {
        id: 2,
        boardId: 2,
        message: 'I am a die-hard fan of Taylor Swift',
        likes: 10
    },

];


// CardList and Card Component test

describe("CardsList Component", () =>{
    beforeEach(() =>{
        render(<CardList cards={foodCards}/>);
    });

    test("renders an empty cardlist without crashing", () =>{
        const element = render(<CardList cards={[]}/>);
        expect(element).not.toBeNull();
    });

    test("renders without crashing and shows all the cards of food board", () =>{
        foodCards.forEach((foodCard)=>{
            const elementList = screen.getAllByText(foodCard.message);
            expect(elementList.length).toEqual(1)
        })
    })
});

describe("Card Component", () =>{
    beforeEach(() =>{
        render(<NoteCard message={musicCards[0].message} likesCount={musicCards[0].likes}/>);
    });


    test("renders without crashing and shows the message", () =>{
        expect(screen.getByText(/Kpop is the best/)).toBeInTheDocument();
    });

    test("that it will display the count of likes", ()=>{
        expect(screen.getByText(/2/)).toBeInTheDocument();
    });
});

// NewCardForm component
describe("submiting New Card Form , new card will be added to cards", ()=>{
    test("New card is added to foodcards", ()=>{
        //Arrange
        const newCard = {message: "Croissant is my fav pastry."}
        const boardId = 1

        const mockCardSubmit = jest.fn();
        const {getByText, getByLabelText} = render(<NewCardForm selectedBoard={boardId} addCard={mockCardSubmit}/>)

        fireEvent.change(getByLabelText("Message"), {target:{value: newCard.message}})
        fireEvent.click(getByText("Submit"));

        expect(mockCardSubmit).toBeCalled();
        expect(mockCardSubmit.mock.calls).toEqual([[{message: newCard.message}]]);

    })
})