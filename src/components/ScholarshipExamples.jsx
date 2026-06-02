/**
 * Advanced Scholarship Component Examples
 * Shows how to use the scholarship system with various features
 * These are example implementations - customize for your needs
 */

import { useState, useEffect } from 'react';
import {
  searchScholarships,
  sortByDeadline,
  filterByEligibility,
  filterByAmountRange,
  getUrgencyBadge,
  daysUntilDeadline,
  formatDeadline,
  groupByCategory
} from '@/utils/scholarshipUtils';

/**
 * Example 1: Basic Scholarship List
 */
export function BasicScholarshipList() {
  const [scholarships, setScholarships] = useState([]);

  useEffect(() => {
    fetch('/scholarships.json')
      .then(res => res.json())
      .then(data => {
        const all = Object.values(data.scholarships).flat();
        setScholarships(sortByDeadline(all));
      });
  }, []);

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {scholarships.map(s => (
        <div key={s.id} className="border rounded-lg p-4">
          <h3 className="font-bold">{s.name}</h3>
          <p className="text-sm text-gray-600">{s.provider}</p>
          <p className="mt-2">{s.amount}</p>
          <p className="text-sm">Deadline: {formatDeadline(s.deadline)}</p>
          <a href={s.link} target="_blank" rel="noopener noreferrer"
             className="text-blue-600 hover:underline">
            Learn More
          </a>
        </div>
      ))}
    </div>
  );
}

/**
 * Example 2: Searchable Scholarship List
 */
export function SearchableScholarshipList() {
  const [scholarships, setScholarships] = useState([]);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  useEffect(() => {
    fetch('/scholarships.json')
      .then(res => res.json())
      .then(data => {
        const all = Object.values(data.scholarships).flat();
        setScholarships(all);
        setResults(all);
      });
  }, []);

  const handleSearch = (e) => {
    const q = e.target.value;
    setQuery(q);
    const filtered = searchScholarships(scholarships, q);
    setResults(sortByDeadline(filtered));
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search scholarships..."
        value={query}
        onChange={handleSearch}
        className="w-full p-2 border rounded mb-4"
      />
      <div className="grid gap-4">
        {results.map(s => (
          <div key={s.id} className="border rounded p-4">
            <h3 className="font-bold">{s.name}</h3>
            <p className="text-sm text-gray-600">{s.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Example 3: Filtered Scholarship List
 */
export function FilteredScholarshipList() {
  const [scholarships, setScholarships] = useState([]);
  const [minAmount, setMinAmount] = useState(0);
  const [maxAmount, setMaxAmount] = useState(10000000);
  const [eligibility, setEligibility] = useState('');

  useEffect(() => {
    fetch('/scholarships.json')
      .then(res => res.json())
      .then(data => {
        const all = Object.values(data.scholarships).flat();
        setScholarships(all);
      });
  }, []);

  const filtered = filterByAmountRange(
    filterByEligibility(scholarships, eligibility),
    minAmount,
    maxAmount
  );

  return (
    <div>
      <div className="mb-6 grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">
            Eligibility Keywords
          </label>
          <input
            type="text"
            placeholder="e.g., engineering, science"
            value={eligibility}
            onChange={(e) => setEligibility(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">
            Amount Range: ₹{minAmount} - ₹{maxAmount}
          </label>
          <input
            type="range"
            min="0"
            max="10000000"
            step="10000"
            value={maxAmount}
            onChange={(e) => setMaxAmount(parseInt(e.target.value))}
            className="w-full"
          />
        </div>
      </div>

      <div className="grid gap-4">
        {filtered.map(s => (
          <div key={s.id} className="border rounded p-4">
            <h3 className="font-bold">{s.name}</h3>
            <p>{s.amount}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Example 4: Urgent Scholarships Widget
 */
export function UrgentScholarshipsWidget() {
  const [urgent, setUrgent] = useState([]);

  useEffect(() => {
    fetch('/scholarships.json')
      .then(res => res.json())
      .then(data => {
        const all = Object.values(data.scholarships).flat();
        const urgent = all.filter(s => {
          const days = daysUntilDeadline(s.deadline);
          return days && days <= 7;
        });
        setUrgent(sortByDeadline(urgent).slice(0, 5));
      });
  }, []);

  return (
    <div className="bg-red-50 border-l-4 border-red-500 p-4">
      <h3 className="font-bold text-red-700 mb-4">⏰ Closing Soon</h3>
      <div className="space-y-2">
        {urgent.map(s => (
          <div key={s.id} className="flex justify-between items-start">
            <div>
              <p className="font-medium text-sm">{s.name}</p>
              <p className="text-xs text-gray-600">
                Closes in {daysUntilDeadline(s.deadline)} days
              </p>
            </div>
            <a href={s.link} target="_blank" rel="noopener noreferrer"
               className="text-red-600 text-sm font-bold">
              Apply
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Example 5: Category Breakdown
 */
export function ScholarshipCategoryBreakdown() {
  const [categories, setCategories] = useState({});

  useEffect(() => {
    fetch('/scholarships.json')
      .then(res => res.json())
      .then(data => setCategories(data.scholarships));
  }, []);

  return (
    <div className="grid md:grid-cols-5 gap-4">
      {Object.entries(categories).map(([cat, scholarships]) => (
        <div key={cat} className="bg-gray-50 p-4 rounded text-center">
          <p className="text-2xl font-bold text-blue-600">
            {scholarships.length}
          </p>
          <p className="text-sm text-gray-600 capitalize mt-2">
            {cat} Scholarships
          </p>
        </div>
      ))}
    </div>
  );
}

/**
 * Example 6: Advanced Scholarship Card
 */
export function AdvancedScholarshipCard({ scholarship }) {
  const badge = getUrgencyBadge(scholarship.deadline);
  const days = daysUntilDeadline(scholarship.deadline);

  return (
    <div className={`border rounded-lg p-6 ${badge.bgLight}`}>
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-bold text-lg">{scholarship.name}</h3>
          <p className="text-sm text-gray-600">{scholarship.provider}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-bold ${badge.color} text-white`}>
          {badge.text}
        </span>
      </div>

      <div className="space-y-3">
        <div>
          <p className="text-xs text-gray-600">AMOUNT</p>
          <p className="font-bold">{scholarship.amount}</p>
        </div>

        <div>
          <p className="text-xs text-gray-600">DEADLINE</p>
          <p className="font-bold">
            {formatDeadline(scholarship.deadline)}
            {days && ` (${days} days)`}
          </p>
        </div>

        <div>
          <p className="text-xs text-gray-600">ELIGIBILITY</p>
          <p className="text-sm">{scholarship.eligibility}</p>
        </div>

        <div>
          <p className="text-xs text-gray-600">ABOUT</p>
          <p className="text-sm">{scholarship.description}</p>
        </div>
      </div>

      <a
        href={scholarship.link}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 w-full block bg-blue-600 text-white text-center py-2 rounded font-bold hover:bg-blue-700"
      >
        Apply Now
      </a>
    </div>
  );
}

/**
 * Example 7: Scholarship Statistics
 */
export function ScholarshipStatistics() {
  const [stats, setStats] = useState({
    total: 0,
    expired: 0,
    expiringSoon: 0,
    active: 0,
    byCategory: {}
  });

  useEffect(() => {
    fetch('/scholarships.json')
      .then(res => res.json())
      .then(data => {
        const all = Object.values(data.scholarships).flat();
        
        const expired = all.filter(s => {
          const days = daysUntilDeadline(s.deadline);
          return days && days < 0;
        });

        const expiringSoon = all.filter(s => {
          const days = daysUntilDeadline(s.deadline);
          return days && days > 0 && days <= 7;
        });

        setStats({
          total: all.length,
          expired: expired.length,
          expiringSoon: expiringSoon.length,
          active: all.length - expired.length,
          byCategory: Object.fromEntries(
            Object.entries(data.scholarships).map(([cat, schs]) => [cat, schs.length])
          )
        });
      });
  }, []);

  return (
    <div className="grid md:grid-cols-4 gap-4 mb-8">
      <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
        <p className="text-gray-600 text-sm">Total Scholarships</p>
        <p className="text-3xl font-bold text-blue-600">{stats.total}</p>
      </div>

      <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
        <p className="text-gray-600 text-sm">Active</p>
        <p className="text-3xl font-bold text-green-600">{stats.active}</p>
      </div>

      <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-500">
        <p className="text-gray-600 text-sm">Closing Soon</p>
        <p className="text-3xl font-bold text-orange-600">{stats.expiringSoon}</p>
      </div>

      <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-500">
        <p className="text-gray-600 text-sm">Expired</p>
        <p className="text-3xl font-bold text-red-600">{stats.expired}</p>
      </div>
    </div>
  );
}

/**
 * Example 8: Comparison Table
 */
export function ScholarshipComparison() {
  const [scholarships, setScholarships] = useState([]);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    fetch('/scholarships.json')
      .then(res => res.json())
      .then(data => {
        const all = Object.values(data.scholarships).flat();
        setScholarships(sortByDeadline(all).slice(0, 10));
      });
  }, []);

  return (
    <div>
      <div className="mb-4 flex flex-wrap gap-2">
        {scholarships.map(s => (
          <button
            key={s.id}
            onClick={() => 
              setSelected(selected.includes(s.id) 
                ? selected.filter(id => id !== s.id)
                : [...selected, s.id]
              )
            }
            className={`px-3 py-1 rounded text-sm ${
              selected.includes(s.id)
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200'
            }`}
          >
            {s.name.split(' ')[0]}
          </button>
        ))}
      </div>

      {selected.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full border">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 text-left">Scholarship</th>
                <th className="p-2">Amount</th>
                <th className="p-2">Deadline</th>
              </tr>
            </thead>
            <tbody>
              {scholarships
                .filter(s => selected.includes(s.id))
                .map(s => (
                  <tr key={s.id} className="border-t">
                    <td className="p-2">{s.name}</td>
                    <td className="p-2 text-center">{s.amount}</td>
                    <td className="p-2 text-center">{formatDeadline(s.deadline)}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

/**
 * Example 9: Bookmark Feature
 */
export function BookmarkableScholarshipList() {
  const [scholarships, setScholarships] = useState([]);
  const [bookmarks, setBookmarks] = useState(() => {
    const saved = localStorage.getItem('scholarshipBookmarks');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    fetch('/scholarships.json')
      .then(res => res.json())
      .then(data => {
        const all = Object.values(data.scholarships).flat();
        setScholarships(sortByDeadline(all));
      });
  }, []);

  const toggleBookmark = (id) => {
    const newBookmarks = bookmarks.includes(id)
      ? bookmarks.filter(bid => bid !== id)
      : [...bookmarks, id];
    setBookmarks(newBookmarks);
    localStorage.setItem('scholarshipBookmarks', JSON.stringify(newBookmarks));
  };

  return (
    <div className="space-y-4">
      {scholarships.map(s => (
        <div key={s.id} className="border rounded p-4 flex justify-between items-start">
          <div className="flex-1">
            <h3 className="font-bold">{s.name}</h3>
            <p className="text-sm text-gray-600">{s.provider}</p>
          </div>
          <button
            onClick={() => toggleBookmark(s.id)}
            className={`ml-4 px-3 py-1 rounded ${
              bookmarks.includes(s.id)
                ? 'bg-yellow-200 text-yellow-800'
                : 'bg-gray-200'
            }`}
          >
            {bookmarks.includes(s.id) ? '★' : '☆'}
          </button>
        </div>
      ))}
    </div>
  );
}
