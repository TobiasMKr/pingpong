
export default function Account() {
    return (
        <div className="flex justify-center py-12">
            <div className="max-w-lg w-full bg-white p-6 rounded-lg shadow-md mt-6">
                <h2 className="text-xl font-bold mb-4">Brukerprofil</h2>
                <p>Navn: [Ditt navn]</p>
                <p>Email: [Din email]</p>
                <p>ELO: [Din ELO]</p>
            </div>
        </div>
    );
}