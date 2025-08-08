import { FormUser } from "@/components/FormUser";
import { ProtectedRoute } from "@/components/ProtectedRoute";

const CreateUserPage = () => {
    return (
        <div>
            <ProtectedRoute>
                <FormUser />
            </ProtectedRoute>
        </div>
    );
};

export default CreateUserPage;