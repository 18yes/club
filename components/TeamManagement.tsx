
import React, { useState } from 'react';
import { Team } from '../types';
import Modal from './Modal';
import TeamForm from './TeamForm';
import { allTeams } from '../mockData';

const TeamManagement: React.FC = () => {
    const [teams, setTeams] = useState<Team[]>(allTeams);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTeam, setEditingTeam] = useState<Partial<Team> | null>(null);

    const handleAddNewClick = () => {
        setEditingTeam({});
        setIsModalOpen(true);
    };

    const handleEditClick = (team: Team) => {
        setEditingTeam(team);
        setIsModalOpen(true);
    };

    const handleToggleStatus = (teamId: string) => {
        setTeams(currentTeams =>
            currentTeams.map(team =>
                team.id === teamId
                    ? { ...team, status: team.status === 'Active' ? 'Frozen' : 'Active' }
                    : team
            )
        );
    };

    const handleDeleteClick = (teamId: string) => {
        if (window.confirm('您确定要删除该团队吗？此操作将解散团队。')) {
            setTeams(currentTeams => currentTeams.filter(t => t.id !== teamId));
        }
    };

    const handleSaveTeam = (teamToSave: Partial<Team>) => {
        if (teamToSave.id) {
            // Edit existing team
            setTeams(currentTeams =>
                currentTeams.map(t => (t.id === teamToSave.id ? (teamToSave as Team) : t))
            );
        } else {
            // Add new team
            const newTeam: Team = {
                ...teamToSave,
                id: `T${Date.now()}`,
                memberCount: 1, // Leader is the first member
                status: 'Active',
                createdAt: new Date().toISOString().split('T')[0],
            } as Team;
            setTeams(currentTeams => [newTeam, ...currentTeams]);
        }
        handleCloseModal();
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingTeam(null);
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold">团队管理</h3>
                <button
                    onClick={handleAddNewClick}
                    className="px-4 py-2 bg-brand-primary text-white font-semibold rounded-lg hover:bg-brand-secondary transition-colors"
                >
                    添加新团队
                </button>
            </div>

            <div className="bg-dark-card shadow-md rounded-lg overflow-x-auto">
                <table className="min-w-full leading-normal">
                    <thead>
                        <tr>
                            <th className="px-5 py-3 border-b-2 border-dark-border bg-gray-800 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">团队名称</th>
                            <th className="px-5 py-3 border-b-2 border-dark-border bg-gray-800 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">团长</th>
                            <th className="px-5 py-3 border-b-2 border-dark-border bg-gray-800 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">成员数</th>
                            <th className="px-5 py-3 border-b-2 border-dark-border bg-gray-800 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">状态</th>
                            <th className="px-5 py-3 border-b-2 border-dark-border bg-gray-800 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        {teams.map(team => (
                            <tr key={team.id} className="hover:bg-dark-border">
                                <td className="px-5 py-4 border-b border-dark-border text-sm">
                                    <p className="font-semibold">{team.name}</p>
                                    <p className="text-xs text-gray-400">ID: {team.id}</p>
                                </td>
                                <td className="px-5 py-4 border-b border-dark-border text-sm">
                                    <p>{team.leaderName}</p>
                                    <p className="text-xs text-gray-400">ID: {team.leaderId}</p>
                                </td>
                                <td className="px-5 py-4 border-b border-dark-border text-sm">{team.memberCount}</td>
                                <td className="px-5 py-4 border-b border-dark-border text-sm">
                                    <span className={`relative inline-block px-3 py-1 font-semibold leading-tight ${team.status === 'Active' ? 'text-green-300' : 'text-red-300'}`}>
                                        <span aria-hidden className={`absolute inset-0 ${team.status === 'Active' ? 'bg-green-800' : 'bg-red-800'} opacity-50 rounded-full`}></span>
                                        <span className="relative">{team.status}</span>
                                    </span>
                                </td>
                                <td className="px-5 py-4 border-b border-dark-border text-sm space-x-2 whitespace-no-wrap">
                                    <button onClick={() => handleEditClick(team)} className="text-blue-400 hover:underline">编辑</button>
                                    <button onClick={() => handleToggleStatus(team.id)} className="text-yellow-400 hover:underline">
                                        {team.status === 'Active' ? '冻结' : '解冻'}
                                    </button>
                                    <button onClick={() => handleDeleteClick(team.id)} className="text-red-400 hover:underline">删除</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {isModalOpen && (
                <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                    <TeamForm
                        team={editingTeam}
                        onSave={handleSaveTeam}
                        onClose={handleCloseModal}
                    />
                </Modal>
            )}
        </div>
    );
};

export default TeamManagement;