import Post from '../Assests/nine-squares (1).png'
import Activepost from '../Assests/nine-squares.png'
import Saved from '../Assests/save (1).svg'
import Activesaved from '../Assests/save.svg'
import Tagged from '../Assests/user-avatar (2).png'
import Activetagged from '../Assests/user-avatar (1).png'
import { Mypost } from '../Component/Pages/Mypost'


export const  Profiledata = 
 [
    {
        id:1,
        name:"POSTS",
        icon:Post,
        activeicon:Activepost,
        children:<Mypost/>
    },
    {
        id:2,
        name:"SAVED",
        icon:Saved,
        activeicon:Activesaved,
        children:'Saved Posts'


    },
    {
        id:3,
        name:"TAGGED",
        icon:Tagged,
        activeicon:Activetagged,
        children:'Tagged'
    },
   
];

