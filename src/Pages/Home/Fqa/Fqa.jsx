import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box, Grid } from '@mui/material';

export default function Fqa() {
    return (
        <Grid sx={{ marginTop: "40px" }}>
            <Box sx={{ flexGrow: 1,  margin: '20px 0px', padding: "80px"}}>
                <Typography variant='h4' sx={{textAlign: "center", marginBottom: "30px"}}>Frequently Asked Questions</Typography>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography>How can i post?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            Firstly, you have to signin than go to your dashboard and create post there.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                    >
                        <Typography>How do i comment a post?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            Firstly, you have to signin than go to post section and go to the post details and comment that post.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                    >
                        <Typography>How do i like a post?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            Firstly, you have to signin than go to post section and go to the post details and like that post.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                    >
                        <Typography>How do i dislike a post?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            Firstly, you have to signin than go to post section and go to the post details and dislike that post.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            </Box>
        </Grid>

    );
}