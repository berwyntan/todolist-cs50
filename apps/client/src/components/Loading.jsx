import { FallingLines } from 'react-loader-spinner'

const Loading = () => {
    return(
        <FallingLines
            color="#4fa94d"
            width="100"
            visible={true}
            ariaLabel='falling-lines-loading'
        />
    )
}

export default Loading