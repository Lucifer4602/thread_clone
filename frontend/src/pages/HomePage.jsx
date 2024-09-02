import { Box, Flex, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import useShowToast from "../hooks/useShowToast";
import Post from "../components/Post";
import { useRecoilState } from "recoil";
import postsAtom from "../atoms/postsAtom";
import SuggestedUsers from "../components/SuggestedUsers";

const HomePage = () => {
  const [posts, setPosts] = useRecoilState(postsAtom);
  const [loading, setLoading] = useState(true);
  const showToast = useShowToast();

  useEffect(() => {
    const getFeedPosts = async () => {
      setLoading(true);
      setPosts([]); // Clear previous posts
      try {
        const res = await fetch(
          "https://thread-clone-dbyf.onrender.com/api/posts/feed",
          {
            method: "GET",
            credentials: "include", // Include credentials (JWT token) in the request
          }
        );

        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const data = await res.json();
        if (data.error) {
          showToast("Error", data.error, "error");
          return;
        }

        setPosts(data);
      } catch (error) {
        showToast("Error", error.message, "error");
      } finally {
        setLoading(false);
      }
    };

    getFeedPosts();
  }, [showToast, setPosts]);

  return (
    <Flex gap="10" alignItems={"flex-start"}>
      <Box flex={70}>
        {loading ? (
          <Flex justify="center" align="center" h="100vh">
            <Spinner size="xl" />
          </Flex>
        ) : posts.length === 0 ? (
          <h1>Follow some users to see the feed</h1>
        ) : (
          posts.map((post) => (
            <Post key={post._id} post={post} postedBy={post.postedBy} />
          ))
        )}
      </Box>
      <Box
        flex={30}
        display={{
          base: "none",
          md: "block",
        }}
      >
        <SuggestedUsers />
      </Box>
    </Flex>
  );
};

export default HomePage;
