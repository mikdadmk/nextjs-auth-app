"use client";

import { useState, useEffect, useCallback } from "react";
import { Avatar, Stack, Typography, Box, FormControl, Select, MenuItem, InputLabel, Button, Dialog, IconButton } from "@mui/material";
import { motion } from "framer-motion";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter } from "next/navigation";

interface Performer {
  chestNumber?: string;
  name?: string;
  totalMark: number;
  image?: string;
  team: string;
}

interface Result {
  programme: string;
  position: string;
  mark: number;
}

const AllPerformers: React.FC = () => {
  const router = useRouter();
  const [performers, setPerformers] = useState<Performer[]>([]);
  const [filter, setFilter] = useState<string>("");
  const [selectedPerformer, setSelectedPerformer] = useState<Performer | null>(null);
  const [performerResults, setPerformerResults] = useState<Result[]>([]);
  const [open, setOpen] = useState(false);

  const fetchPerformers = useCallback(async () => {
    try {
      const query = new URLSearchParams();
      if (filter) query.append("filter", filter);

      const response = await fetch(`/api/marklist-topperformers?${query.toString()}`);
      const data: Performer[] = await response.json();
      setPerformers(data);
    } catch (error) {
      console.error("Error fetching performers:", error);
    }
  }, [filter]);

  useEffect(() => {
    fetchPerformers();
  }, [fetchPerformers]);

  const fetchPerformerResults = async (chestNumber?: string) => {
    if (!chestNumber) return;
    try {
      const response = await fetch(`/api/marklist-topperformers?chestNumber=${chestNumber}`);
      const data: Result[] = await response.json();
      setPerformerResults(data);
      setOpen(true);
    } catch (error) {
      console.error("Error fetching performer results:", error);
    }
  };

  const handlePerformerClick = (performer: Performer) => {
    setSelectedPerformer(performer);
    fetchPerformerResults(performer.chestNumber);
  };

  return (
    <Box p={3} sx={{ background: "linear-gradient(135deg, #f1f1f1, #c5e1e5)", borderRadius: "12px" }}>
      {/* ✅ Fixed: Used `onClick` instead of `<Link>` to avoid nested `<a>` elements */}
      <IconButton sx={{ mb: 2 }} onClick={() => router.push("/result")}>
        <ArrowBackIcon />
      </IconButton>

      <Typography
        variant="h3"
        fontWeight="700"
        gutterBottom
        sx={{
          textAlign: "center",
          color: "#2c3e50",
        }}
      >
        Performers
      </Typography>

      {/* Filter Dropdown */}
      <FormControl fullWidth sx={{ mb: 3 }}>
        <InputLabel>Filter</InputLabel>
        <Select value={filter} onChange={(e) => setFilter(e.target.value)} label="Filter">
          <MenuItem value="">All</MenuItem>
          <MenuItem value="general">General (Top Teams)</MenuItem>
          <MenuItem value="dhamak">Dhamak</MenuItem>
          <MenuItem value="jhalak">jhalak</MenuItem>
          <MenuItem value="chamak">Chamak</MenuItem>
          <MenuItem value="aliya">Aliya</MenuItem>
          <MenuItem value="bidaya">Bidaya</MenuItem>
          <MenuItem value="thanawiyya">Thanawiyya</MenuItem>
        </Select>
      </FormControl>

      {/* Performer Grid */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr 1fr", sm: "repeat(5, 1fr)", md: "repeat(6, 1fr)" },
          gap: 2,
        }}
      >
        {performers.map((performer) => (
          <motion.div
            key={performer.team + (performer.chestNumber || "")}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              padding: "10px",
              background: "white",
              borderRadius: "8px",
              cursor: "pointer",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
            }}
            onClick={() => handlePerformerClick(performer)}
          >
            <Stack direction="column" alignItems="center" spacing={2}>
              {performer.image && <Avatar src={performer.image} alt={performer.name} sx={{ width: 60, height: 60 }} />}
              <Box textAlign="center">
                {performer.name && (
                  <Typography variant="h6" fontWeight="700" sx={{ color: "#34495e" }}>
                    {performer.name}
                  </Typography>
                )}
                <Typography variant="subtitle2" color="textSecondary">
                  Total Mark: {performer.totalMark}
                </Typography>
                {performer.chestNumber && (
                  <Typography variant="body2" color="textSecondary">
                    Chest Number: {performer.chestNumber}
                  </Typography>
                )}
                <Typography variant="body2" color="textSecondary">
                  Team: {performer.team}
                </Typography>
              </Box>
            </Stack>
          </motion.div>
        ))}
      </Box>

      {/* Modal for displaying detailed results */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <Box p={3} sx={{ minWidth: 300 }}>
          <Typography variant="h5" fontWeight="700" sx={{ textAlign: "center", mb: 2 }}>
            {selectedPerformer?.name} Results
          </Typography>
          {performerResults.length > 0 ? (
            performerResults.map((result, index) => (
              <Box key={index} sx={{ mb: 2, p: 2, background: "#f5f5f5", borderRadius: "8px" }}>
                <Typography variant="body1">
                  <strong>Programme:</strong> {result.programme}
                </Typography>
                <Typography variant="body1">
                  <strong>Position:</strong> {result.position}
                </Typography>
                <Typography variant="body1">
                  <strong>Mark:</strong> {result.mark}
                </Typography>
              </Box>
            ))
          ) : (
            <Typography variant="body1" sx={{ textAlign: "center" }}>
              No results found.
            </Typography>
          )}
          <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }} onClick={() => setOpen(false)}>
            Close
          </Button>
        </Box>
      </Dialog>
    </Box>
  );
};

export default AllPerformers;
