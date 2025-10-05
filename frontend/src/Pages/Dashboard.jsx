export const Dashboard = () => {

    async function fetchAmount(){
        const token = localStorage.getItem("token");
        if(!token){
            alert("Login First");
            return;
        }
        const response = await axios.get(`${BACKEND_URL}/api/v1/getData`,{
            headers:{
                Authorization: `Bearer ${token}`
            }
        });
        console.log(response.data);
        alert("Data fetched successfully");
    }

    return (
        <div>
            <div className="flex align-items-center justify-between p-6 text-white">
                <div className="text-3xl font-bold p-4 text-black">
                    Transactions
                </div>
                <div className="text-xl font-semibold p-4 text-black flex">
                    <div className="p-2">
                        Hello, User!
                    </div>
                    <img src="https://ui-avatars.com/api/?name=User" alt="User Avatar" className="w-10 h-10 rounded-full border border-gray-300"/>
                </div>
            </div>
            <div className="border-b border-gray-300"/>
            <div>

            </div>
        </div>
    )
}