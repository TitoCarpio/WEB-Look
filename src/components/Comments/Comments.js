import React from 'react'

function Comments({user, description}) {
    return (
        <div className="bg-gray-100 max-h-20 overflow-auto">
        <h1 className="font-semibold">{user}:</h1>
        <p>{description}</p>
        </div>
    )
}

export default Comments