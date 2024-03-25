import { Fragment, useState, useEffect } from "react";
import { Dialog, Disclosure, Transition } from "@headlessui/react";
import ProspectTable from "./ProspectTable"; // Adjust the path according to your file structure
import {
  XMarkIcon,
  ChevronDownIcon,
  PlusIcon,
  MinusIcon,
} from "@heroicons/react/20/solid";
import Navbar from "./Navbar";

const filters = [
  {
    id: "industry",
    name: "Industry",
    options: [
      { value: "Airlines and Aviation", label: "Airlines and Aviation" },
      { value: "Food & Agriculture", label: "Food & Agriculture" },
      { value: "IT", label: "IT" },
    ],
  },
  {
    id: "title",
    name: "Job Title",
    options: [
      {
        value: "Deputy Director IT Projects Airport Operations",
        label: "Deputy Director IT Projects Airport Operations",
      },
      {
        value: "Team Manager - IT Solution Architect",
        label: "Team Manager - IT Solution Architect",
      },
      {
        value: "Deputy Director IT Enterprise Architecture",
        label: "Deputy Director IT Enterprise Architecture",
      },
      { value: "IT Solutions Architect", label: "IT Solutions Architect" },
      { value: "Chief Executive Officer", label: "Chief Executive Officer" },
      {
        value: "Director, IT - Business Analysis",
        label: "Director, IT - Business Analysis",
      },
      { value: "IT Service Desk Manager", label: "IT Service Desk Manager" },
      { value: "Food & Agriculture", label: "Food & Agriculture" },
      { value: "Software Engineer", label: "Software Engineer" },
    ],
  },
];

export default function Example() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [selectedIndustries, setSelectedIndustries] = useState([]);
  const [selectedTitles, setSelectedTitles] = useState([]);
  const [companyName, setCompanyName] = useState("");
  const [fetchedProspects, setFetchedProspects] = useState([]);
  const [totalContacts, setTotalContacts] = useState(0);

  useEffect(() => {
    const fetchFilteredProspects = async () => {
      const response = await fetch("http://localhost:5000/api/v1/fetchLeads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          selectedIndustries,
          selectedTitles,
          companyName,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Fetched data:", data.data); // Debugging line
        if (Array.isArray(data.data)) {
          // Safety check
          setFetchedProspects(data.data);
          setTotalContacts(data.data.length); // Update total contacts based on the response length

        } else {
          console.error("Received data is not an array:", data.data);
        }
      } else {
        console.error("Failed to fetch prospects");
      }
    };

    fetchFilteredProspects();
  }, [selectedIndustries, selectedTitles, companyName]);

  // Function to handle industry filter selection
  const handleIndustrySelection = (selectedOption) => {
    setSelectedIndustries((prevSelected) =>
      prevSelected.includes(selectedOption)
        ? prevSelected.filter((industry) => industry !== selectedOption)
        : [...prevSelected, selectedOption]
    );
  };

  // Function to handle job title filter selection
  const handleTitleSelection = (selectedOption) => {
    setSelectedTitles((prevSelected) =>
      prevSelected.includes(selectedOption)
        ? prevSelected.filter((title) => title !== selectedOption)
        : [...prevSelected, selectedOption]
    );
  };

  // Function to handle company name input
  const handleCompanyNameInput = (event) => {
    setCompanyName(event.target.value);
  };

  return (
    <>
      <Navbar />
      <div className="bg-[#f6f6f6]">
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
  <div className="flex items-center justify-between border-b border-gray-200 pb-6 pt-14">
  
      <h1 className="text-4xl font-bold tracking-tight text-gray-900 mr-4">
        Prospect search
      </h1>
      <div className="gap-2 flex items-center bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-md">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16" height="16" width="16">
<g clip-path="url(#clip0_8183_21)">
<path fill="#151417" d="M4.00012 9.66666C4.60542 9.66678 5.20267 9.80543 5.74612 10.072C5.78786 10.0924 5.82486 10.1214 5.85475 10.1569C5.88464 10.1925 5.90676 10.234 5.91969 10.2786C5.93263 10.3232 5.93608 10.3701 5.92984 10.4161C5.9236 10.4622 5.9078 10.5064 5.88346 10.546C5.30601 11.4845 5.00022 12.5648 5.00012 13.6667C5.00012 13.7551 4.965 13.8399 4.90249 13.9024C4.83998 13.9649 4.75519 14 4.66679 14H0.333445C0.245039 14 0.160254 13.9649 0.0977421 13.9024C0.0352297 13.8399 0.000110626 13.7551 0.000110626 13.6667C0.000110626 12.6058 0.421538 11.5884 1.17169 10.8382C1.92183 10.0881 2.93925 9.66666 4.00012 9.66666Z"></path>
<path fill="#151417" d="M6.53735 6.83334C6.53735 7.16165 6.47269 7.48674 6.34705 7.79005C6.22142 8.09337 6.03727 8.36896 5.80512 8.60111C5.57297 8.83326 5.29738 9.01741 4.99406 9.14304C4.69075 9.26868 4.36566 9.33334 4.03735 9.33334C3.70905 9.33334 3.38396 9.26868 3.08065 9.14304C2.77733 9.01741 2.50173 8.83326 2.26959 8.60111C2.03744 8.36896 1.85329 8.09337 1.72765 7.79005C1.60202 7.48674 1.53735 7.16165 1.53735 6.83334C1.53735 6.50504 1.60202 6.17995 1.72765 5.87663C1.85329 5.57332 2.03744 5.29772 2.26959 5.06558C2.50173 4.83343 2.77733 4.64928 3.08065 4.52364C3.38396 4.39801 3.70905 4.33334 4.03735 4.33334C4.36566 4.33334 4.69075 4.39801 4.99406 4.52364C5.29738 4.64928 5.57297 4.83343 5.80512 5.06558C6.03727 5.29772 6.22142 5.57332 6.34705 5.87663C6.47269 6.17995 6.53735 6.50504 6.53735 6.83334Z"></path>
<path fill="#151417" d="M14.1667 5.16667C14.1667 6.00652 13.8331 6.81198 13.2393 7.40584C12.6454 7.99971 11.8399 8.33334 11.0001 8.33334C10.1602 8.33334 9.35478 7.99971 8.76091 7.40584C8.16705 6.81198 7.83342 6.00652 7.83342 5.16667C7.83342 4.32682 8.16705 3.52136 8.76091 2.9275C9.35478 2.33363 10.1602 2 11.0001 2C11.8399 2 12.6454 2.33363 13.2393 2.9275C13.8331 3.52136 14.1667 4.32682 14.1667 5.16667Z"></path>
<path fill="#151417" d="M6 13.6667C6 12.3406 6.52678 11.0688 7.46447 10.1311C8.40215 9.19344 9.67392 8.66666 11 8.66666C12.3261 8.66666 13.5979 9.19344 14.5355 10.1311C15.4732 11.0688 16 12.3406 16 13.6667C16 13.7551 15.9649 13.8399 15.9024 13.9024C15.8399 13.9649 15.7551 14 15.6667 14H6.33333C6.24493 14 6.16014 13.9649 6.09763 13.9024C6.03512 13.8399 6 13.7551 6 13.6667Z"></path>
</g>
<defs>
<clipPath id="clip0_8183_21">
<rect transform="matrix(-1 0 0 1 16 0)" fill="white" height="16" width="16"></rect>
</clipPath>
</defs>
</svg>
        <span> Contacts ({totalContacts})</span>
      </div>
    </div>

          <section aria-labelledby="prospects-heading" className="pb-24 pt-6">
            <h2 id="prospects-heading" className="sr-only">
              Prospects
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              {/* Filters */}
              <form className="hidden lg:block">
                {filters.map((section) => (
                  <Disclosure
                    as="div"
                    key={section.id}
                    className="border-b border-gray-200 py-6"
                  >
                    {({ open }) => (
                      <>
                        <h3 className="-my-3 flow-root">
                          <Disclosure.Button className="flex w-full items-center justify-between py-3 text-sm text-gray-400 hover:text-gray-500">
                            <span className="font-medium text-gray-900">
                              {section.name}
                            </span>
                            <span className="ml-6 flex items-center">
                              {open ? (
                                <MinusIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              ) : (
                                <PlusIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              )}
                            </span>
                          </Disclosure.Button>
                        </h3>
                        <Disclosure.Panel className="pt-6">
                          <div className="space-y-4">
                            {section.options.map((option, optionIdx) => (
                              <div
                                key={option.value}
                                className="flex items-center"
                              >
                                <input
                                  id={`filter-${section.id}-${optionIdx}`}
                                  name={`${section.id}[]`}
                                  value={option.value}
                                  type="checkbox"
                                  checked={
                                    section.id === "industry"
                                      ? selectedIndustries.includes(
                                          option.value
                                        )
                                      : selectedTitles.includes(option.value)
                                  }
                                  onChange={() =>
                                    section.id === "industry"
                                      ? handleIndustrySelection(option.value)
                                      : handleTitleSelection(option.value)
                                  }
                                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                />
                                <label
                                  htmlFor={`filter-${section.id}-${optionIdx}`}
                                  className="ml-3 text-sm text-gray-600"
                                >
                                  {option.label}
                                </label>
                              </div>
                            ))}
                          </div>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                ))}
                <div className="pt-6">
                  <label
                    htmlFor="company-name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Company Name
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    id="company-name"
                    className="mt-1 block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Search by company name"
                    onChange={handleCompanyNameInput}
                  />
                </div>
              </form>

              {/* Prospect grid */}
              <div className="lg:col-span-3">
                <ProspectTable prospects={fetchedProspects} />
              </div>
            </div>
            {/* </div> */}
          </section>
        </main>
      </div>
    </>
  );
}
