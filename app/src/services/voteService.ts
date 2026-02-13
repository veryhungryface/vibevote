
import { supabase } from '../db/supabase';

export interface VotePayload {
    projectId: number;
    voterName: string;
}


export const submitVote = async (vote: VotePayload) => {
    try {
        // 1. Get all votes by this user
        const { data: userVotes, error: checkError } = await supabase
            .from('votes')
            .select('project_id')
            .eq('voter_name', vote.voterName);

        if (checkError) throw checkError;

        // 2. Check if already voted for this project
        if (userVotes?.some(v => Number(v.project_id) === vote.projectId)) {
            throw new Error('ALREADY_VOTED_FOR_PROJECT');
        }

        // 3. Check if vote limit reached
        if (userVotes && userVotes.length >= 3) {
            throw new Error('VOTE_LIMIT_REACHED');
        }

        // 4. Submit vote
        const { error } = await supabase
            .from('votes')
            .insert([
                {
                    project_id: vote.projectId,
                    voter_name: vote.voterName,
                    voter_team: '' // Default to empty string to satisfy NOT NULL constraint
                }
            ]);

        if (error) {
            console.error("Error submitting vote:", error);
            throw error;
        }
    } catch (err) {
        console.error("Vote submission failed:", err);
        throw err;
    }
};

export const cancelVote = async (projectId: number, voterName: string) => {
    try {
        const { error } = await supabase
            .from('votes')
            .delete()
            .eq('project_id', projectId)
            .eq('voter_name', voterName);

        if (error) throw error;
    } catch (err) {
        console.error("Error cancelling vote:", err);
        throw err;
    }
};

export const getUserVotes = async (voterName: string): Promise<number[]> => {
    try {
        if (!voterName) return [];
        const { data, error } = await supabase
            .from('votes')
            .select('project_id')
            .eq('voter_name', voterName);

        if (error) throw error;
        return data?.map(v => Number(v.project_id)) || [];
    } catch (err) {
        console.error("Error fetching user votes:", err);
        return [];
    }
};

export const getVoteCounts = async (): Promise<Record<string, number>> => {
    try {
        const { data, error } = await supabase
            .from('votes')
            .select('project_id');

        if (error) throw error;

        const counts: Record<string, number> = {};
        data?.forEach(v => {
            const pid = String(v.project_id);
            counts[pid] = (counts[pid] || 0) + 1;
        });

        return counts;
    } catch (err) {
        console.error("Error fetching vote counts:", err);
        return {};
    }
};


export const getAllVoters = async (): Promise<{ name: string; count: number }[]> => {
    try {
        const { data, error } = await supabase
            .from('votes')
            .select('voter_name');

        if (error) throw error;

        const countMap: Record<string, number> = {};
        data?.forEach(v => {
            countMap[v.voter_name] = (countMap[v.voter_name] || 0) + 1;
        });

        return Object.entries(countMap)
            .map(([name, count]) => ({ name, count }))
            .sort((a, b) => a.name.localeCompare(b.name, 'ko'));
    } catch (err) {
        console.error("Error fetching all voters:", err);
        return [];
    }
};
