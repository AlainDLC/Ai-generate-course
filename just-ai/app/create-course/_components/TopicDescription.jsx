import { UseInputContext } from "@/app/_context/UseInputContext";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useContext } from "react";
export default function TopicDescriptoin() {
  const { userCourseInput, setUserCourseInput } = useContext(UseInputContext);

  const handleInputChange = (fieldName, value) => {
    setUserCourseInput((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };
  return (
    <div className="mx-20 lg:mx-44">
      <div className="mt-5">
        <label>
          💡 Specify the type of driving license you are applying for. (e.g.,
          Bike, Car, Truck, etc.)
        </label>
        <Input
          placeholder="Licens"
          onChange={(e) => handleInputChange("topic", e.target.value)}
          defaultValue={userCourseInput?.topic}
        />
      </div>
      <div className="mt-5">
        <label>
          📝 Tell ous more about your course, what you want to include the
          course
        </label>
        <Textarea
          placeholder="Lets do it"
          onChange={(e) => handleInputChange("description", e.target.value)}
          defaultValue={userCourseInput?.description}
        />
      </div>
    </div>
  );
}
