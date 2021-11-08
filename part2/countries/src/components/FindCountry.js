import React from 'react'

const FindCountry = (props) => {
    return(
        <>
            <form>
                <label>Find Countries</label>
                <input value = {props.inputVal} onChange = {props.onChange} />
            </form>
        </>
    )
}

export default FindCountry