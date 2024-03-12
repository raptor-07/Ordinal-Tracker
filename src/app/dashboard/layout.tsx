import Box from "@mui/material/Box";
import TopBar from "../../components/dashboard/TopBar";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Box
        sx={{
          height: "100vh",
        }}
      >
        <TopBar />
        {children}
      </Box>
    </div>
  );
}

export default Layout;
