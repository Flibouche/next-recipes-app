import Link from 'next/link'

const Recipe = () => {
    return (
        <>
            <h1>Ingredients :</h1>
            <nav>
                <Link href='/recipe/add'>Add a recipe</Link>
            </nav>
        </>
    )
}

export default Recipe