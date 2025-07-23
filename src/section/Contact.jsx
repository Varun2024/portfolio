

const Contact = () => {
    return (
        <section className='relative flex items-center c-space section-spacing'>
            <div className="flex flex-col items-center justify-center max-w-md p-5 mx-auto border border-white/10 rounded-2xl bg-primary">
                <div className="flex flex-col items-start w-full gap-5 mb-10">
                    <h2 className='text-heading'>Let's Connect</h2>
                    <p className='font-normal text-neutral-400'>From building fresh websites to enhancing existing platforms or launching innovative projects — I’ve got you covered.</p>
                </div>
                <form action="" className='w-full'>
                    <div className="mb-5">
                        <label htmlFor="name" className='field-label '>
                            Full name
                        </label>
                        <input 
                        type="text" 
                        id='name' 
                        name='name'  
                        className='field-input field-input-focus'
                        placeholder='Salmon bhoi'
                        autoComplete='name'
                        required
                        />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="name" className='field-label '>
                            Full name
                        </label>
                        <input 
                        type="text" 
                        id='name' 
                        name='name'  
                        className='field-input field-input-focus'
                        placeholder='Salmon bhoi'
                        autoComplete='name'
                        required
                        />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="name" className='field-label '>
                            Full name
                        </label>
                        <input 
                        type="text" 
                        id='name' 
                        name='name'  
                        className='field-input field-input-focus'
                        placeholder='Salmon bhoi'
                        autoComplete='name'
                        required
                        />
                    </div>
                </form>
            </div>
        </section>
    )
}

export default Contact