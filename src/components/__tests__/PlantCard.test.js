import {render} from '@testing-library/react'
import PlantCard from '../PlantCard'
import React from 'react'

describe(PlantCard, () => {

    it('showing the facts of a specific plant -name', () =>{
        const {getByTestId} = render(<PlantCard
        name={'chili'} 
        
         />)
         const plantNameValue = getByTestId('plant').textContent
         expect(plantNameValue).toEqual('chili')
    })


    it('showing the facts of a specific plant - type', () =>{
        const {getByTestId} = render(<PlantCard
        type={'small'} 
        
         />)
         const plantNameValue = getByTestId('type').textContent
         expect(plantNameValue).toEqual('Type: small')
    })

    it('showing the facts of a specific plant -friends', () =>{
        const {getByTestId} = render(<PlantCard
        friends ={'tomato'} 
        
         />)
         const plantNameValue = getByTestId('friends').textContent
         expect(plantNameValue).toEqual('Friends: tomato')
    })

    it('showing the facts of a specific plant -avoid', () =>{
        const {getByTestId} = render(<PlantCard
        avoid ={'onion'} 
        
         />)
         const plantNameValue = getByTestId('avoid').textContent
         expect(plantNameValue).toEqual('Avoid: onion')
    })

    it('showing the facts of a specific plant -harvest', () =>{
        const {getByTestId} = render(<PlantCard
        minTime ={'20'} 
        maxTime={'30'}
         />)
         const plantNameValue = getByTestId('harvest').textContent
         expect(plantNameValue).toEqual('Time to harvest: 20 - 30 days')
    })
})



