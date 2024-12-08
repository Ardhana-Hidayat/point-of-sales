import { FormAddCategory } from "@/components/form/FormAddCategory";
import { TableCategory } from "@/components/organism/TableCategory";


export default function CategoryPage() {
    return (
        <div className="ml-10 w-full">
            <div>
                Category
            </div>

            <div className="flex justify-between mt-5">
                <div>
                    <TableCategory />
                </div>
                <div>
                    <FormAddCategory />
                </div>
            </div>
        </div>
    );
}
