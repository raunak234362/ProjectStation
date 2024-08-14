/* eslint-disable react/prop-types */

const Button = ({children, type='button',className="",...props}) => {
    return (
    <button
    type={type}
    className={`${className} bg-blue-500 px-5 py-1  text-white text-lg rounded-xl`}
    {...props}
    >
        {children}
    </button>
  )
}

export default Button