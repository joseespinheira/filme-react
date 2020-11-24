
import './style.css'

const Input = (props) => {
    return (
        <div>
            <input onKeyUp={({key})=> this.value = key} onInput={({key}) => (key)} id={props.id} type={props.type} name={props.name} value={props.value} placeholder={props.placeholder} />
            <label htmlFor={props.id}>{props.label}</label>
        </div>
    )
}

export default Input;