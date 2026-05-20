import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, MapPin, Star, Search, X, Loader2 } from 'lucide-react';
import { destinationService } from '../../services/destination.service';
import toast from 'react-hot-toast';

const CATEGORIES = ['Beach', 'Mountain', 'Heritage', 'Nature', 'Adventure'];

const emptyForm = {
  name: '', state: '', category: 'Beach', description: '', image: '',
  rating: 4.5, best_time: '', attractions: [],
};

const ManageDestinations = () => {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({ ...emptyForm });
  const [search, setSearch] = useState('');
  const [saving, setSaving] = useState(false);

  // Attraction form
  const [attrForm, setAttrForm] = useState({ name: '', type: '', distance: '', rating: 4.5, img: '' });

  useEffect(() => { fetchDestinations(); }, []);

  const fetchDestinations = async () => {
    try {
      setLoading(true);
      const { data } = await destinationService.getAll();
      setDestinations(data || []);
    } catch (err) {
      toast.error('Failed to fetch destinations');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editId) {
        await destinationService.update(editId, form);
        toast.success('Destination updated!');
      } else {
        await destinationService.create(form);
        toast.success('Destination created!');
      }
      setShowForm(false);
      setEditId(null);
      setForm({ ...emptyForm });
      fetchDestinations();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to save');
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (dest) => {
    setForm({
      name: dest.name, state: dest.state, category: dest.category,
      description: dest.description, image: dest.image || '',
      rating: dest.rating, best_time: dest.best_time || '',
      attractions: dest.attractions || [],
    });
    setEditId(dest.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this destination?')) return;
    try {
      await destinationService.delete(id);
      toast.success('Deleted');
      fetchDestinations();
    } catch (err) {
      toast.error('Failed to delete');
    }
  };

  const addAttraction = () => {
    if (!attrForm.name) return;
    setForm(prev => ({ ...prev, attractions: [...(prev.attractions || []), { ...attrForm }] }));
    setAttrForm({ name: '', type: '', distance: '', rating: 4.5, img: '' });
  };

  const removeAttraction = (i) => {
    setForm(prev => ({ ...prev, attractions: prev.attractions.filter((_, idx) => idx !== i) }));
  };

  const filtered = destinations.filter(d =>
    d.name.toLowerCase().includes(search.toLowerCase()) ||
    d.state.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manage Destinations</h1>
          <p className="text-sm text-gray-500">{destinations.length} destinations total</p>
        </div>
        <button onClick={() => { setForm({ ...emptyForm }); setEditId(null); setShowForm(true); }}
          className="bg-rose-500 hover:bg-rose-600 text-white font-bold px-5 py-2.5 rounded-xl flex items-center gap-2 text-sm transition shadow-sm">
          <Plus size={18} /> Add Destination
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search destinations..."
          className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-rose-200 focus:border-rose-400 outline-none" />
      </div>

      {/* Table */}
      {loading ? (
        <div className="flex justify-center py-12"><Loader2 className="animate-spin w-8 h-8 text-rose-500" /></div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-gray-600 text-xs uppercase tracking-wider">
                <tr>
                  <th className="px-5 py-3.5 text-left font-semibold">Destination</th>
                  <th className="px-5 py-3.5 text-left font-semibold">Category</th>
                  <th className="px-5 py-3.5 text-left font-semibold">Rating</th>
                  <th className="px-5 py-3.5 text-left font-semibold">Attractions</th>
                  <th className="px-5 py-3.5 text-left font-semibold">Best Time</th>
                  <th className="px-5 py-3.5 text-right font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.map(d => (
                  <tr key={d.id} className="hover:bg-gray-50/50 transition">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        {d.image && <img src={d.image} alt={d.name} className="w-10 h-10 rounded-lg object-cover" />}
                        <div>
                          <p className="font-semibold text-gray-900">{d.name}</p>
                          <p className="text-xs text-gray-400">{d.state}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700">{d.category}</span>
                    </td>
                    <td className="px-5 py-4">
                      <span className="flex items-center gap-1 text-amber-500 font-bold">
                        <Star className="w-3.5 h-3.5 fill-amber-500" /> {d.rating}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-gray-600">{(d.attractions || []).length}</td>
                    <td className="px-5 py-4 text-gray-600">{d.best_time || '-'}</td>
                    <td className="px-5 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => handleEdit(d)} className="p-2 rounded-lg hover:bg-blue-50 text-blue-600 transition">
                          <Edit2 size={16} />
                        </button>
                        <button onClick={() => handleDelete(d.id)} className="p-2 rounded-lg hover:bg-red-50 text-red-500 transition">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filtered.length === 0 && (
            <div className="text-center py-12 text-gray-400">No destinations found</div>
          )}
        </div>
      )}

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center overflow-y-auto py-8" onClick={() => setShowForm(false)}>
          <div className="bg-white rounded-2xl max-w-2xl w-full mx-4 shadow-2xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-900">{editId ? 'Edit' : 'Add'} Destination</h2>
              <button onClick={() => setShowForm(false)} className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center"><X size={18} /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-5 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-1">Name</label>
                  <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-rose-200 focus:border-rose-400 outline-none" placeholder="Goa" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-1">State</label>
                  <input value={form.state} onChange={e => setForm({ ...form, state: e.target.value })} required
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-rose-200 focus:border-rose-400 outline-none" placeholder="Goa" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-1">Category</label>
                  <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-rose-200 focus:border-rose-400 outline-none">
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-1">Rating</label>
                  <input type="number" step="0.1" min="0" max="5" value={form.rating} onChange={e => setForm({ ...form, rating: +e.target.value })}
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-rose-200 focus:border-rose-400 outline-none" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-1">Description</label>
                <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} rows={3} required
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-rose-200 focus:border-rose-400 outline-none resize-none" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-1">Image URL</label>
                  <input value={form.image} onChange={e => setForm({ ...form, image: e.target.value })}
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-rose-200 focus:border-rose-400 outline-none" placeholder="https://..." />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-1">Best Time to Visit</label>
                  <input value={form.best_time} onChange={e => setForm({ ...form, best_time: e.target.value })}
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-rose-200 focus:border-rose-400 outline-none" placeholder="Oct - Mar" />
                </div>
              </div>

              {/* Attractions */}
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">Attractions ({(form.attractions || []).length})</label>
                {(form.attractions || []).map((a, i) => (
                  <div key={i} className="flex items-center gap-2 mb-2 p-2 bg-gray-50 rounded-lg text-xs">
                    <MapPin size={14} className="text-rose-500" />
                    <span className="font-medium flex-1">{a.name} ({a.type}) — {a.distance}</span>
                    <button type="button" onClick={() => removeAttraction(i)} className="text-red-400 hover:text-red-600"><X size={14} /></button>
                  </div>
                ))}
                <div className="grid grid-cols-5 gap-2 mt-2">
                  <input value={attrForm.name} onChange={e => setAttrForm({ ...attrForm, name: e.target.value })} placeholder="Name" className="p-2 bg-gray-50 border border-gray-200 rounded-lg text-xs" />
                  <input value={attrForm.type} onChange={e => setAttrForm({ ...attrForm, type: e.target.value })} placeholder="Type" className="p-2 bg-gray-50 border border-gray-200 rounded-lg text-xs" />
                  <input value={attrForm.distance} onChange={e => setAttrForm({ ...attrForm, distance: e.target.value })} placeholder="Distance" className="p-2 bg-gray-50 border border-gray-200 rounded-lg text-xs" />
                  <input value={attrForm.img} onChange={e => setAttrForm({ ...attrForm, img: e.target.value })} placeholder="Image URL" className="p-2 bg-gray-50 border border-gray-200 rounded-lg text-xs" />
                  <button type="button" onClick={addAttraction} className="bg-rose-500 text-white rounded-lg text-xs font-bold hover:bg-rose-600 transition">+ Add</button>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                <button type="button" onClick={() => setShowForm(false)} className="px-5 py-2.5 border border-gray-200 rounded-xl text-sm font-semibold hover:bg-gray-50">Cancel</button>
                <button type="submit" disabled={saving} className="px-6 py-2.5 bg-rose-500 hover:bg-rose-600 text-white rounded-xl text-sm font-bold transition disabled:opacity-50">
                  {saving ? 'Saving...' : editId ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageDestinations;
