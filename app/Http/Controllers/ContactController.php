<?php

namespace App\Http\Controllers;


use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Inertia\Inertia;
use Illuminate\Support\Facades\Redirect;
use App\Models\Contact;
use App\Services\ContactService;
use App\Http\Requests\StoreContactRequest;


class ContactController extends Controller
{
    use AuthorizesRequests, ValidatesRequests;

    protected $contactService;

    public function __construct(ContactService $contactService)
    {
        $this->contactService = $contactService;
    }


    public function index(Request $request) 
    {
        $contacts = $this->contactService->getAllContacts();
        return Inertia::render('Dashboard', [
            'contacts' => $contacts
        ]);
    }

    public function create() {
        return Inertia::render('Dashboard', [
            'showModal' => true,
            'modalType'=> 'create'
        ]);
    } 

    public function store(StoreContactRequest $request) 
    {
        $validated = $request->validated();
        $this->contactService->createContact($validated);
        return Redirect::route('Dashboard')->with('success', 'Contact created successfully');
    }

    public function show(Contact $contact) {
        $this->authorize('view', $contact);
        return Inertia::render('SingleContact', [
            'contact' => $contact
        ]);
    }

    public function edit(Contact $contact) {
        $this->authorize('update', $contact);
        return Inertia::render('Dashboard', [
            "showModal" => true,
            "modalType" => 'edit',
            'contact' => $contact
        ]);
    }

    public function update(StoreContactRequest $request, Contact $contact)
    {
        $this->authorize('update', $contact);
        $validated = $request->validated();
        $this->contactService->updateContact($contact, $validated);
        return Redirect::route('Dashboard')->with('success', 'Contact updated successfully');
    }

    public function destroy(Contact $contact)
    {
        $this->authorize('delete', $contact);
        $this->contactService->deleteContact($contact);
        return Redirect::route('Dashboard')->with('success', 'Contact deleted successfully');
    }

}
