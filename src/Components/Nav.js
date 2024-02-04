import '../App.css'

// I added this mostly just to have the border at the top with the App name.  I did it 
// this way so that it could be modified in the future if desired.

function Nav() {
    return (
        <nav className='Nav'>
            <div className='container'>Phone Book App</div>
        </nav>
    )
}

export default Nav;