import { Controls } from '@components/Controls'

const Meet = () => {
    return (
        <section className="flex flex-col justify-center h-[calc(100vh-120px)] px-5 lg:px-20 xl:px-40 ">
            <div className='bg-black h-[500px] rounded-2xl'>video</div>
            <Controls />
        </section>
    )
}

export default Meet