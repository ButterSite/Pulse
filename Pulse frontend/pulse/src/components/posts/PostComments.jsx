import { Post } from "./Post"
const testComments = [
  {
    _id: "comment-1",
    content: "Świetny post, bardzo trafne spostrzeżenia!",
    authorUsername: "ania_dev",
    authorNames: "Ania Kowalska",
    likes: 3,
    hashTags: [],
    parentId: "post-123"
  },
  {
    _id: "comment-2",
    content: "Mam podobne zdanie, dzięki za podzielenie się tym.",
    authorUsername: "codeMaster",
    authorNames: "Jan Nowak",
    likes: 1,
    hashTags: [],
    parentId: "post-123"
  },
  {
    _id: "comment-3",
    content: "Nie zgadzam się z tym podejściem, ale szanuję opinię.",
    authorUsername: "devTomek",
    authorNames: "Tomasz Lis",
    likes: 0,
    hashTags: [],
    parentId: "post-123"
  },
  {
    _id: "comment-4",
    content: "Masz jakieś źródła do tego co napisałeś?",
    authorUsername: "curious_cat",
    authorNames: "Katarzyna Wiśniewska",
    likes: 5,
    hashTags: [],
    parentId: "post-123"
  }
]


export const Comments = ({parentPostId, setShowComments}) => {






    return (
        <div className="post-container">
        {testComments.map((value,index) => {
            return (
                <>
       
                </>
            )
        })}
        </div>
    )
}