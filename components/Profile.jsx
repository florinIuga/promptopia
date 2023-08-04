import PromptCard from "./PromptCard"
import Image from "next/image"

const Profile = ({ name, profilePic, desc, data, handleEdit, handleDelete, handleProfileClick }) => {
  return (
    <section className="w-full;">
      <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
          <Image
            src={profilePic}
            alt="use_image"
            width={90}
            height={90}
            className="rounded-full object-contain"
          />
           <h1 className="head_text text-left">
            <span className="blue_gradient">
              {name} profile
            </span>
          </h1>
      </div>
      <p className="desc text-left">{desc}</p>

      <div className="mt-10 prompt_layout">
        {data.map((post) =>  (
            <PromptCard
              key={post._id}
              post={post}
              handleEdit={() => handleEdit && handleEdit(post)}
              handleDelete={() => handleDelete && handleDelete(post)}
              handleProfileClick={() => handleProfileClick && handleProfileClick(post)}/>
        ))}
      </div>
    </section>
  )
}

export default Profile