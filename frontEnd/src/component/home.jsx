/* eslint-disable react/prop-types */
import './style.css';


const Home = (props) => {
    console.log('props', props);
    console.log('props id:', props.id);

    return (
        <>
        <h1> Welcome {props.name}</h1>
        <h1> Email {props.email}</h1>
        <h1> Phone {props.phone}</h1>

        </>
    )
};

export default Home;