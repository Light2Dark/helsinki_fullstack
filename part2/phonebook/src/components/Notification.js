const SuccessNotification = ({message}) => {
    if (message === null) {
        return null
    }

    return (
        <div className = "success">
            {message}
        </div>
    )
}

const ErrorNotification = ({message}) => {
    if (message === null) {
        return null
    }

    return (
        <div className = "error">
            {message}
        </div>
    )
}

// based on notification.type
// return (
//     <div className={notification.type}>
//       {notification.message}
//     </div>
//   )

export {SuccessNotification, ErrorNotification}