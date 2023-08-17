

const Button = ({item, onclick}) => {
    return (
        <button className='py-2 px-7 m-5 bg-white text-black font-semibold rounded-3xl' onClick={onclick}>{item}</button>
    )
} 
export default Button