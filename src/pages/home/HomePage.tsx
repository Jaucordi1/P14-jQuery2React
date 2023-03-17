import Classes from './HomePage.module.scss'

export default function HomePage() {
    return (
        <main className={Classes.page}>
            <h1>HRnet</h1>
            <h2>Create Employee</h2>

            <form action="#">
                <label>
                    <span>First Name</span>
                    <input type="text" name="firstname" autoComplete="firstname" />
                </label>
                <label>
                    <span>Last Name</span>
                    <input type="text" name="lastname" autoComplete="lastname" />
                </label>
                <label>
                    <span>Date of Birth</span>
                    <input type="date" name="birthdate" />
                </label>
                <label>
                    <span>Start Date</span>
                    <input type="date" name="startdate" />
                </label>
                <fieldset>
                    <legend>Address</legend>
                    <label>
                        <span>Street</span>
                        <input type="text" name="street" autoComplete="street" />
                    </label>
                    <label>
                        <span>City</span>
                        <input type="text" name="City" autoComplete="city" />
                    </label>
                    <label>
                        <span>State</span>
                        <select name="state">
                            <option value="AL">Alabama</option>
                        </select>
                    </label>
                    <label>
                        <span>Zip code</span>
                        <input type="text" name="zipcode" autoComplete="zipcode" />
                    </label>
                </fieldset>
                <label>
                    <span>Department</span>
                    <select name="department">
                        <option value="sales">Sales</option>
                        <option value="marketing">Marketing</option>
                        <option value="engineering">Engineering</option>
                        <option value="hr">Human Resources</option>
                        <option value="legal">Legal</option>
                    </select>
                </label>
            </form>
        </main>
    )
}
